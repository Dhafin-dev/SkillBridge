import { projectRepository } from '../repositories/projectRepository';
import { notificationService } from './notificationService';
import { userRepository } from '../repositories/userRepository';
import { AppError } from '../utils/AppError';

export class ProjectService {
  async getPublishedProjects() {
    const projects = await projectRepository.findPublishedProjects();

    return projects.map(p => ({
      id: p.id,
      title: p.title,
      companyName: p.owner.name,
      companyLogo: p.owner.umkmProfile?.companyLogo || '',
      matchScore: p.matchScore,
      stipend: p.stipend,
      description: p.description,
      tags: this.parseJson(p.tags, []),
      level: p.level,
      duration: p.duration,
      appliedCount: (p as any)._count?.applications ?? 0,
      category: (p as any).category?.name || 'Other',
      deadline: p.deadline?.toISOString(),
      teamSize: p.teamSize,
      overview: p.overview,
      objectives: this.parseJson(p.objectives, []),
      deliverables: this.parseJson(p.deliverables, []),
    }));
  }

  async getProjectById(id: string, requester?: { id: string; role: string }) {
    const project = await projectRepository.findById(id);
    if (!project) throw new AppError('Project not found', 404);

    // P0: Do not expose applicant details to unauthenticated callers or non-owner users
    const isOwnerOrAdmin = requester && (
      project.ownerId === requester.id ||
      requester.role?.toUpperCase() === 'ADMIN'
    );

    const userApplication = requester
      ? project.applications.find((app: any) => app.studentId === requester.id)
      : null;
    const hasApplied = !!userApplication;

    const applications = isOwnerOrAdmin
      ? project.applications.map((app: any) => ({
          id: app.id,
          status: app.status,
          student: {
            id: app.student.id,
            name: app.student.name,
            avatar: app.student.avatar || '',
            institution: app.student.studentProfile?.institution || 'Unknown',
            skills: this.parseJson(app.student.studentProfile?.skills, []),
          },
        }))
      : [];

    return {
      id: project.id,
      title: project.title,
      createdAt: project.createdAt.toISOString(),
      companyName: project.owner.name,
      companyLogo: project.owner.umkmProfile?.companyLogo || '',
      matchScore: project.matchScore,
      stipend: project.stipend,
      description: project.description,
      tags: this.parseJson(project.tags, []),
      level: project.level,
      duration: project.duration,
      appliedCount: (project as any)._count?.applications ?? 0,
      category: (project as any).category?.name || 'Other',
      deadline: project.deadline?.toISOString(),
      teamSize: project.teamSize,
      overview: project.overview,
      objectives: this.parseJson(project.objectives, []),
      deliverables: this.parseJson(project.deliverables, []),
      aboutUmkm: `${project.owner.name} is in the ${project.owner.umkmProfile?.industry || 'technology'} industry.`,
      hasApplied,
      applicationStatus: userApplication ? userApplication.status : null,
      _count: (project as any)._count,
      applications,
    };
  }


  async getStudentActiveProjects(studentId: string) {
    const applications = await projectRepository.findActiveApplicationsByStudent(studentId);

    return applications.map(app => ({
      id: app.project.id,
      title: app.project.title,
      companyName: app.project.owner.name,
      status: app.status === 'PENDING' ? 'Pending' : 
             (app.status === 'ACCEPTED' ? (app.project.status === 'COMPLETED' ? 'Completed' : 'Active') : 'Rejected'),
      applicationStatus: app.status,
      phaseName: app.status === 'ACCEPTED' ? 'Active Project' : 'Application Phase',
      dueDate: app.project.deadline?.toLocaleDateString('en-ID', { day: '2-digit', month: 'short', year: 'numeric' }) || 'TBD',
      progressPercent: app.status === 'ACCEPTED' ? 25 : 0,
      category: (app.project as any).category?.name || 'Other',
      stipend: app.project.stipend,
    }));
  }

  async getUmkmRequests(umkmId: string) {
    const projects = await projectRepository.findProjectsByOwner(umkmId);

    return projects.map(p => ({
      id: p.id,
      title: p.title,
      status: p.status,
      progressPercent: 0,
      lastUpdate: p.updatedAt.toLocaleDateString('en-ID', { day: '2-digit', month: 'short', year: 'numeric' }),
      category: (p as any).category?.name || 'Other',
      applicationsCount: (p as any)._count?.applications ?? 0,
      stipend: p.stipend,
      level: p.level,
    }));
  }

  async createProject(umkmId: string, data: any) {
    const projectData = {
      title: data.title,
      categoryName: data.category || 'Other',
      level: data.level || 'Beginner',
      duration: data.duration || 'Flexible',
      stipend: data.stipend || 'Unpaid',
      description: data.description || '',
      overview: data.overview || '',
      objectives: JSON.stringify(data.objectives || []),
      deliverables: JSON.stringify(data.deliverables || []),
      tags: JSON.stringify(data.tags || []),
      status: data.status || 'PUBLISHED',
      teamSize: data.teamSize || '1 Student',
      deadline: data.deadline ? new Date(data.deadline) : undefined,
      ownerId: umkmId
    };
    return projectRepository.create(projectData);
  }

  async applyProject(projectId: string, studentId: string) {
    const project = await projectRepository.findById(projectId);
    if (!project) throw new AppError('Project not found', 404);

    // P1: Students can only apply to published projects
    if (project.status !== 'PUBLISHED' && project.status !== 'ACTIVE') {
      throw new AppError('Applications are only accepted for active, published projects', 400);
    }

    // P1: Check deadline expiration
    if (project.deadline && new Date(project.deadline) < new Date()) {
      throw new AppError('The application deadline for this project has passed', 400);
    }

    // Prevent owner from applying to their own project
    if (project.ownerId === studentId) {
      throw new AppError('You cannot apply to your own project', 400);
    }

    // P1: Check for existing duplicate application -> 409 Conflict
    const existingApp = await projectRepository.findApplication(projectId, studentId);
    if (existingApp) {
      throw new AppError('You have already applied to this project', 409);
    }

    // P1: Check project capacity
    const acceptedCount = await projectRepository.countAcceptedApplications(projectId);
    const maxCapacity = this.parseCapacity(project.teamSize);
    if (acceptedCount >= maxCapacity) {
      throw new AppError('This project has already reached its maximum student capacity', 400);
    }
    
    const student = await userRepository.findById(studentId);
    const result = await projectRepository.createApplication(projectId, studentId);
    
    await notificationService.createNotification(
      project.ownerId, 
      'PROJECT', 
      'New Application Received', 
      `${student?.name || 'A student'} has applied to your project: ${project.title}.`,
      `/umkm/projects/${projectId}`
    );
    
    return result;
  }

  async acceptApplication(umkmId: string, projectId: string, studentId: string) {
    const project = await projectRepository.findById(projectId);
    if (!project) throw new AppError('Project not found', 404);
    if (project.ownerId !== umkmId) throw new AppError('Unauthorized access to project applications', 403);

    const application = await projectRepository.findApplication(projectId, studentId);
    if (!application) throw new AppError('Application not found', 404);
    if (application.status !== 'PENDING') {
      throw new AppError(`Cannot accept application with status "${application.status}". Only pending applications can be accepted.`, 400);
    }

    const acceptedCount = await projectRepository.countAcceptedApplications(projectId);
    const maxCapacity = this.parseCapacity(project.teamSize);
    if (acceptedCount >= maxCapacity) {
      throw new AppError('Project has reached its maximum accepted capacity', 400);
    }
    
    const result = await projectRepository.acceptApplication(projectId, studentId, umkmId);
    
    await notificationService.createNotification(
      studentId,
      'PROJECT',
      'Application Accepted',
      `Congratulations! Your application for ${project.title} has been accepted.`,
      `/student/my-projects`
    );
    
    return result;
  }

  async rejectApplication(umkmId: string, projectId: string, studentId: string) {
    const project = await projectRepository.findById(projectId);
    if (!project) throw new AppError('Project not found', 404);
    if (project.ownerId !== umkmId) throw new AppError('Unauthorized access to project applications', 403);

    const application = await projectRepository.findApplication(projectId, studentId);
    if (!application) throw new AppError('Application not found', 404);
    if (application.status !== 'PENDING') {
      throw new AppError(`Cannot reject application with status "${application.status}".`, 400);
    }
    
    const result = await projectRepository.rejectApplication(projectId, studentId);
    
    await notificationService.createNotification(
      studentId,
      'PROJECT',
      'Application Update',
      `Your application for ${project.title} was not selected this time. Keep exploring other opportunities!`,
      `/projects/${projectId}`
    );
    
    return result;
  }

  async completeProject(umkmId: string, projectId: string, data: { studentId: string; rating: number; comment: string }) {
    const project = await projectRepository.findById(projectId);
    if (!project) throw new AppError('Project not found', 404);
    if (project.ownerId !== umkmId) throw new AppError('Unauthorized: You do not own this project', 403);

    const { studentId, rating, comment } = data;
    const prismaModule = await import('../utils/prisma');
    const prisma = prismaModule.default;

    return prisma.$transaction(async (tx) => {
      // 1. Update project status to COMPLETED
      await tx.project.update({
        where: { id: projectId },
        data: { status: 'COMPLETED' }
      });

      // 2. Update workspace status to COMPLETED & progress to 100%
      await tx.workspace.updateMany({
        where: { projectId },
        data: { status: 'COMPLETED', progressPercent: 100 }
      });

      // 3. Create or update Review
      const existingReview = await tx.review.findFirst({
        where: { projectId, authorId: umkmId, targetId: studentId }
      });

      let reviewRecord;
      if (existingReview) {
        reviewRecord = await tx.review.update({
          where: { id: existingReview.id },
          data: { rating, comment }
        });
      } else {
        reviewRecord = await tx.review.create({
          data: {
            projectId,
            authorId: umkmId,
            targetId: studentId,
            rating,
            comment
          }
        });
      }

      // 4. Update student profile stats
      const studentProfile = await tx.studentProfile.findUnique({
        where: { userId: studentId }
      });

      if (studentProfile) {
        const scoreBonus = rating * 3;
        const newScore = Math.min(100, studentProfile.portfolioScore + scoreBonus);
        await tx.studentProfile.update({
          where: { userId: studentId },
          data: {
            completedProjectsCount: { increment: 1 },
            portfolioScore: newScore
          }
        });
      }

      // 5. Send Notification to student
      const { notificationService } = await import('./notificationService');
      const senderName = project.owner?.umkmProfile?.companyName || project.owner?.name || 'UMKM Client';
      await notificationService.createNotification(
        studentId,
        'PROJECT',
        'Project Completed & Review Received! ⭐',
        `Congratulations! ${senderName} has marked '${project.title}' as completed and awarded you a ${rating}-star review.`,
        '/profile'
      );

      return {
        completed: true,
        projectId,
        review: reviewRecord
      };
    });
  }

  async updateProject(userId: string, projectId: string, data: any) {
    const project = await projectRepository.findById(projectId);
    if (!project) throw new AppError('Project not found', 404);
    if (project.ownerId !== userId) throw new AppError('Unauthorized: You do not own this project', 403);

    const prismaModule = await import('../utils/prisma');
    const prisma = prismaModule.default;

    const updateData: any = {};
    if (data.title !== undefined) updateData.title = data.title;
    if (data.status !== undefined) updateData.status = data.status;
    if (data.level !== undefined) updateData.level = data.level;
    if (data.duration !== undefined) updateData.duration = data.duration;
    if (data.stipend !== undefined) updateData.stipend = data.stipend;
    if (data.description !== undefined) updateData.description = data.description;
    if (data.teamSize !== undefined) updateData.teamSize = data.teamSize;
    if (data.deadline !== undefined) updateData.deadline = data.deadline ? new Date(data.deadline) : null;
    if (data.deliverables !== undefined) {
      updateData.deliverables = Array.isArray(data.deliverables) ? JSON.stringify(data.deliverables) : data.deliverables;
    }
    if (data.tags !== undefined) {
      updateData.tags = Array.isArray(data.tags) ? JSON.stringify(data.tags) : data.tags;
    }

    if (data.category) {
      const categoryRecord = await prisma.category.upsert({
        where: { name: data.category },
        update: {},
        create: { name: data.category, description: `${data.category} projects` }
      });
      updateData.categoryId = categoryRecord.id;
    }

    return prisma.project.update({
      where: { id: projectId },
      data: updateData,
      include: {
        category: { select: { name: true } },
        owner: { select: { name: true, umkmProfile: { select: { companyName: true, companyLogo: true } } } },
        _count: { select: { applications: true } }
      }
    });
  }


  private parseCapacity(teamSizeStr?: string | null): number {
    if (!teamSizeStr) return 1;
    const match = teamSizeStr.match(/\d+/g);
    if (!match) return 1;
    // If range like "2-3", take the upper bound
    return Math.max(...match.map(Number));
  }

  private parseJson<T>(value: string | null | undefined, fallback: T): T {
    try {
      return value ? JSON.parse(value) : fallback;
    } catch {
      return fallback;
    }
  }
}


export const projectService = new ProjectService();

