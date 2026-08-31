import prisma from '../utils/prisma';

export const adminService = {
  getOverviewStats: async () => {
    const totalUsers = await prisma.user.count({ where: { role: { not: 'ADMIN' } } });
    const activeProjects = await prisma.project.count({ where: { status: 'ACTIVE' } });
    const totalApplications = await prisma.projectApplication.count();
    const acceptedApplications = await prisma.projectApplication.count({ where: { status: 'ACCEPTED' } });
    const successRate = totalApplications > 0
      ? Math.round((acceptedApplications / totalApplications) * 100)
      : 0;
    return { totalUsers, activeProjects, successRate };
  },

  getAllUsers: async () => {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        isVerified: true,
        avatar: true
      }
    });

    return users.map((u: any) => ({
      ...u,
      verified: u.isVerified,
      status: 'Active',
      avatar: u.avatar || ''
    }));

  },

  getAllProjects: async () => {
    const projects = await prisma.project.findMany({
      include: {
        owner: {
          select: { name: true }
        }
      }
    });

    return projects.map((p: any) => ({
      id: p.id,
      title: p.title,
      status: p.status,
      umkm: p.owner.name,
      student: 'Pending', // We don't have assignments tracked easily yet
      progress: 0,
      date: p.createdAt.toISOString().split('T')[0],
      overdue: false
    }));
  },

  getAllCategories: async () => {
    const categories = await prisma.category.findMany({
      include: {
        _count: {
          select: { projects: true }
        }
      }
    });

    return categories.map((c: any) => ({
      id: c.id,
      name: c.name,
      projectCount: c._count.projects,
      status: 'Active'
    }));
  },

  createCategory: async (name: string, description?: string) => {
    return prisma.category.create({
      data: {
        name,
        description: description || `Projects related to ${name}`,
      }
    });
  },

  updateCategory: async (id: string, name: string, description?: string) => {
    return prisma.category.update({
      where: { id },
      data: {
        name,
        ...(description !== undefined ? { description } : {})
      }
    });
  },

  deleteCategory: async (id: string) => {
    // 1. Check if category exists
    const category = await prisma.category.findUnique({
      where: { id },
      include: { _count: { select: { projects: true } } }
    });
    if (!category) throw new Error('Category not found');

    // 2. If projects are using this category, safely reassign them to a fallback "General" category
    if (category._count.projects > 0) {
      let defaultCat = await prisma.category.findUnique({ where: { name: 'General' } });
      if (!defaultCat) {
        defaultCat = await prisma.category.create({
          data: { name: 'General', description: 'General & Multi-disciplinary projects' }
        });
      }
      if (defaultCat.id !== id) {
        await prisma.project.updateMany({
          where: { categoryId: id },
          data: { categoryId: defaultCat.id }
        });
      }
    }

    // 3. Delete category safely without foreign key constraint violations
    return prisma.category.delete({
      where: { id }
    });
  },

  deleteUser: async (id: string) => {
    return prisma.user.delete({
      where: { id }
    });
  },

  toggleUserStatus: async (id: string, isVerified: boolean) => {
    return prisma.user.update({
      where: { id },
      data: { isVerified }
    });
  },

  rejectVerification: async (id: string, reason?: string) => {
    await prisma.notification.create({
      data: {
        userId: id,
        type: 'SYSTEM',
        title: 'Verification Request Update',
        message: reason || 'Your verification request was not approved. Please ensure your document scan is legible and re-apply.',
        actionRoute: 'profile'
      }
    });
    return { success: true, message: 'Verification rejected and notification sent' };
  },

  getMatchRecommendations: async () => {

    const projects = await prisma.project.findMany({
      where: { status: { in: ['PUBLISHED', 'ACTIVE'] } },
      take: 10,
      include: { owner: true, category: true }
    });
    const students = await prisma.user.findMany({
      where: { role: 'STUDENT' },
      take: 10,
      include: { studentProfile: true }
    });

    if (projects.length === 0 || students.length === 0) return [];

    const recommendations: any[] = [];

    for (const p of projects) {
      let projectTags: string[] = [];
      try {
        projectTags = JSON.parse(p.tags || '[]');
      } catch {
        projectTags = [];
      }

      for (const s of students) {
        let studentSkills: string[] = [];
        try {
          studentSkills = JSON.parse(s.studentProfile?.skills || '[]');
        } catch {
          studentSkills = [];
        }

        // Calculate skill overlap
        const matchedSkills = studentSkills.filter(skill =>
          projectTags.some(tag => tag.toLowerCase().includes(skill.toLowerCase()) || skill.toLowerCase().includes(tag.toLowerCase()))
        );

        const overlapScore = projectTags.length > 0
          ? (matchedSkills.length / projectTags.length) * 50
          : 25;
        const portfolioScoreComponent = ((s.studentProfile?.portfolioScore || 70) / 100) * 40;
        const compatibility = Math.min(99, Math.max(60, Math.round(overlapScore + portfolioScoreComponent + 10)));

        const reason = matchedSkills.length > 0
          ? `Matched on key skills: ${matchedSkills.slice(0, 3).join(', ')} with ${s.studentProfile?.institution || 'institution'} profile alignment.`
          : `Aligned with category "${(p as any).category?.name || 'General'}" based on student portfolio score (${s.studentProfile?.portfolioScore || 75}/100).`;

        recommendations.push({
          id: `match_${p.id}_${s.id}`,
          projectTitle: p.title,
          companyName: p.owner.name,
          compatibility,
          studentName: s.name,
          studentAvatar: s.avatar || 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
          studentInfo: s.studentProfile?.institution || 'University Student',
          reason,
          status: 'pending'
        });
      }
    }

    // Sort by highest compatibility score and return top matches
    return recommendations.sort((a, b) => b.compatibility - a.compatibility).slice(0, 8);
  },


  getVerifications: async () => {
    // Get all users who are not verified, except admins
    const unverifiedUsers = await prisma.user.findMany({
      where: { 
        isVerified: false,
        role: { not: 'ADMIN' }
      },
      include: {
        studentProfile: true,
        umkmProfile: true
      },
      orderBy: {
        createdAt: 'asc'
      }
    });

    return unverifiedUsers.map((u: any) => ({
      id: u.id,
      name: u.name,
      institution: u.role === 'STUDENT' ? (u.studentProfile?.institution || 'Unknown') : (u.umkmProfile?.companyName || 'Unknown'),
      role: u.role.toLowerCase(),
      docType: u.role === 'STUDENT' ? 'Student ID' : 'Business License',
      date: u.createdAt.toISOString().split('T')[0],
      photo: u.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      docScan: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&auto=format&fit=crop&q=80',
      status: 'new'
    }));
  }
};
