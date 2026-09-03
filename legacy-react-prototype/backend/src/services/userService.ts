import { userRepository } from '../repositories/userRepository';
import bcrypt from 'bcryptjs';
import { AppError } from '../utils/AppError';

export class UserService {
  async getRecommendedStudents() {
    const students = await userRepository.findStudents();
    
    return students.map(s => {
      let parsedSkills: string[] = [];
      try {
        parsedSkills = JSON.parse(s.studentProfile?.skills || '[]');
      } catch {
        parsedSkills = [];
      }

      let parsedCerts: any[] = [];
      try {
        if ((s.studentProfile as any)?.certificates) {
          parsedCerts = typeof (s.studentProfile as any).certificates === 'string'
            ? JSON.parse((s.studentProfile as any).certificates)
            : (s.studentProfile as any).certificates;
        }
      } catch {
        parsedCerts = [];
      }

      return {
        id: s.id,
        name: s.name,
        avatar: s.avatar || '',
        institution: s.studentProfile?.institution || 'Unknown',
        matchScore: Math.min(100, (s.studentProfile?.portfolioScore || 0) + (parsedSkills.length * 5) + ((s.studentProfile?.completedProjectsCount || 0) * 10)),
        portfolioScore: s.studentProfile?.portfolioScore || 0,
        projectsCompleted: s.studentProfile?.completedProjectsCount || 0,
        skills: parsedSkills,
        certificates: parsedCerts,
        bio: s.bio || undefined,
      };
    });
  }

  async getUserById(userId: string) {
    const user = await userRepository.findById(userId);
    if (!user) throw new AppError('User not found', 404);

    const prismaModule = await import('../utils/prisma');
    const prisma = prismaModule.default;

    const userReviews = await prisma.review.findMany({
      where: { targetId: userId },
      include: {
        author: {
          include: {
            umkmProfile: true,
          },
        },
        project: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    const formattedReviews = userReviews.map(r => ({
      id: r.id,
      authorName: r.author.name,
      companyName: r.author.umkmProfile?.companyName || r.author.name,
      rating: r.rating,
      comment: r.comment,
      projectName: r.project?.title || 'SkillBridge Collaboration',
      createdAt: r.createdAt.toISOString(),
    }));

    let parsedSkills: string[] = [];
    try {
      if (user.studentProfile?.skills) {
        parsedSkills = typeof user.studentProfile.skills === 'string'
          ? JSON.parse(user.studentProfile.skills)
          : user.studentProfile.skills;
      }
    } catch {
      parsedSkills = [];
    }

    let parsedCerts: any[] = [];
    try {
      if ((user.studentProfile as any)?.certificates) {
        parsedCerts = typeof (user.studentProfile as any).certificates === 'string'
          ? JSON.parse((user.studentProfile as any).certificates)
          : (user.studentProfile as any).certificates;
      }
    } catch {
      parsedCerts = [];
    }

    let umkmStats: any = {};
    let umkmProjects: any[] = [];

    if (user.role === 'UMKM') {
      const projects = await prisma.project.findMany({
        where: { ownerId: userId },
        include: {
          category: true,
          _count: { select: { applications: true } },
          workspaces: true,
          applications: {
            where: { status: 'ACCEPTED' },
            select: { studentId: true }
          }
        },
        orderBy: { createdAt: 'desc' },
      });

      const activeProjectsCount = projects.filter(p => p.status === 'ACTIVE' || p.status === 'PUBLISHED').length;
      const completedProjectsCount = projects.filter(p => p.status === 'COMPLETED').length;

      // Unique students collaborated
      const studentIds = new Set<string>();
      projects.forEach(p => {
        p.applications.forEach(a => studentIds.add(a.studentId));
        p.workspaces.forEach(w => studentIds.add(w.studentId));
      });

      umkmProjects = projects.map(p => ({
        id: p.id,
        title: p.title,
        status: p.status,
        category: p.category?.name || 'Other',
        level: p.level,
        duration: p.duration,
        stipend: p.stipend,
        description: p.description,
        appliedCount: p._count?.applications ?? 0,
        createdAt: p.createdAt.toISOString(),
      }));

      umkmStats = {
        totalProjectsPosted: projects.length,
        activeProjectsCount,
        completedProjectsCount,
        talentsCollaboratedCount: studentIds.size,
        location: user.umkmProfile?.location || '',
        industry: user.umkmProfile?.industry || '',
        website: user.umkmProfile?.website || '',
        instagram: user.umkmProfile?.instagram || '',
        phone: user.umkmProfile?.phone || '',
        businessScale: user.umkmProfile?.businessScale || 'Small Enterprise',
        companyLogo: user.umkmProfile?.companyLogo || user.avatar || '',
        projects: umkmProjects,
      };
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role.toLowerCase(),
      avatar: user.avatar || '',
      isVerified: user.isVerified || false,
      portfolioScore: user.studentProfile?.portfolioScore ?? 85,
      projectsCompleted: user.studentProfile?.completedProjectsCount ?? 0,
      completedProjectsCount: user.studentProfile?.completedProjectsCount ?? 0,
      institution: user.studentProfile?.institution || '',
      companyName: user.umkmProfile?.companyName || user.name,
      bio: user.bio || '',
      skills: user.role === 'STUDENT' ? parsedSkills : [],
      certificates: parsedCerts,
      reviews: formattedReviews,
      ...umkmStats,
    };
  }

  async getMe(userId: string) {
    return this.getUserById(userId);
  }

  async updateProfile(userId: string, data: any) {
    const user = await userRepository.findById(userId);
    if (!user) throw new AppError('User not found', 404);

    const updateData: any = {};
    if (data.name !== undefined) updateData.name = data.name;
    if (data.bio !== undefined) updateData.bio = data.bio;
    if (data.avatar !== undefined) updateData.avatar = data.avatar;

    const institutionVal = data.institution !== undefined ? data.institution : data.headline;
    const companyNameVal = data.companyName !== undefined ? data.companyName : (data.name || data.institution);

    if (user.role === 'STUDENT') {
      const skillsStr = data.skills !== undefined ? JSON.stringify(data.skills) : undefined;
      const certsStr = data.certificates !== undefined ? JSON.stringify(data.certificates) : undefined;
      updateData.studentProfile = {
        upsert: {
          create: {
            institution: institutionVal || '',
            skills: skillsStr || '[]',
            certificates: certsStr || '[]',
            portfolioScore: 85,
            completedProjectsCount: 0,
          },
          update: {
            ...(institutionVal !== undefined ? { institution: institutionVal } : {}),
            ...(skillsStr !== undefined ? { skills: skillsStr } : {}),
            ...(certsStr !== undefined ? { certificates: certsStr } : {}),
          },
        },
      };
    } else if (user.role === 'UMKM') {
      updateData.umkmProfile = {
        upsert: {
          create: {
            companyName: companyNameVal || `${user.name} Business`,
            companyLogo: data.avatar || user.avatar || '',
            industry: data.industry || 'Food & Beverage',
            location: data.location || '',
            website: data.website || '',
            instagram: data.instagram || '',
            phone: data.phone || '',
            businessScale: data.businessScale || 'Small Enterprise',
          },
          update: {
            ...(companyNameVal !== undefined ? { companyName: companyNameVal } : {}),
            ...(data.avatar !== undefined ? { companyLogo: data.avatar } : {}),
            ...(data.industry !== undefined ? { industry: data.industry } : {}),
            ...(data.location !== undefined ? { location: data.location } : {}),
            ...(data.website !== undefined ? { website: data.website } : {}),
            ...(data.instagram !== undefined ? { instagram: data.instagram } : {}),
            ...(data.phone !== undefined ? { phone: data.phone } : {}),
            ...(data.businessScale !== undefined ? { businessScale: data.businessScale } : {}),
          },
        },
      };
    }

    const prismaModule = await import('../utils/prisma');
    await prismaModule.default.user.update({
      where: { id: userId },
      data: updateData,
    });

    return this.getUserById(userId);
  }




  async changePassword(userId: string, currentPassword: string, newPassword: string) {
    const user = await userRepository.findById(userId);
    if (!user || !(await bcrypt.compare(currentPassword, user.passwordHash))) {
      throw new AppError('Current password is incorrect', 400);
    }
    const passwordHash = await bcrypt.hash(newPassword, 12);
    return userRepository.updatePassword(userId, passwordHash);
  }

  async inviteStudent(studentId: string, umkmUserId: string, projectName?: string, projectId?: string) {
    const student = await userRepository.findById(studentId);
    if (!student) throw new AppError('Student not found', 404);

    const umkm = await userRepository.findById(umkmUserId);
    if (!umkm) throw new AppError('Inviting business not found', 404);

    const senderName = umkm.umkmProfile?.companyName || umkm.name || 'An UMKM Business';
    const pName = projectName || 'Industry Collaboration Project';
    const actionRoute = projectId ? `/market` : `/messages/${umkmUserId}`;

    const { notificationService } = await import('./notificationService');
    await notificationService.createNotification(
      studentId,
      'PROJECT',
      `Invitation from ${senderName}`,
      `${senderName} has invited you to collaborate on the project "${pName}".`,
      actionRoute
    );

    return {
      invited: true,
      studentId,
      senderName,
      projectName: pName,
      actionRoute,
    };
  }
}


export const userService = new UserService();
