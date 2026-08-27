import prisma from '../utils/prisma';

export class ProjectRepository {
  async findPublishedProjects() {
    return prisma.project.findMany({
      where: { status: { in: ['PUBLISHED', 'ACTIVE'] } },
      include: {
        owner: {
          select: { name: true, umkmProfile: { select: { companyName: true, companyLogo: true } } }
        },
        category: { select: { name: true } },
        _count: { select: { applications: true } }
      },
      orderBy: { createdAt: 'desc' }
    });
  }

  async findById(id: string) {
    return prisma.project.findUnique({
      where: { id },
      include: {
        owner: {
          select: { name: true, umkmProfile: { select: { companyName: true, companyLogo: true, industry: true } } }
        },
        category: { select: { name: true } },

        applications: {
          include: {
            student: {
              select: {
                id: true,
                name: true,
                avatar: true,
                studentProfile: {
                  select: { institution: true, skills: true }
                }
              }
            }
          }
        },
        _count: {
          select: { applications: true }
        }
      }
    });
  }

  async findActiveApplicationsByStudent(studentId: string) {
    return prisma.projectApplication.findMany({
      where: { studentId },
      include: {
        project: {
          include: {
            owner: true,
            category: { select: { name: true } }
          }
        }
      },
      orderBy: { appliedAt: 'desc' }
    });
  }

  async findProjectsByOwner(ownerId: string) {
    return prisma.project.findMany({
      where: { ownerId },
      include: {
        category: { select: { name: true } },
        _count: { select: { applications: true } }
      },
      orderBy: { createdAt: 'desc' }
    });
  }
  async create(data: any) {
    const { categoryName, ownerId, ...rest } = data;
    const category = await prisma.category.upsert({
      where: { name: categoryName || 'Other' },
      update: {},
      create: { name: categoryName || 'Other' }
    });

    return prisma.project.create({ 
      data: {
        ...rest,
        ownerId,
        categoryId: category.id,
      } 
    });
  }


  async findApplication(projectId: string, studentId: string) {
    return prisma.projectApplication.findUnique({
      where: { projectId_studentId: { projectId, studentId } },
    });
  }

  async countAcceptedApplications(projectId: string) {
    return prisma.projectApplication.count({
      where: { projectId, status: 'ACCEPTED' },
    });
  }

  async acceptApplication(projectId: string, studentId: string, umkmId: string) {
    return prisma.$transaction(async (tx) => {
      const application = await tx.projectApplication.findUnique({
        where: { projectId_studentId: { projectId, studentId } },
      });

      if (!application || application.status !== 'PENDING') {
        throw new Error('Application is not pending');
      }

      await tx.projectApplication.update({
        where: { projectId_studentId: { projectId, studentId } },
        data: { status: 'ACCEPTED' },
      });
      
      await tx.project.update({
        where: { id: projectId },
        data: { status: 'ACTIVE' },
      });
      
      return tx.workspace.upsert({
        where: { projectId_studentId: { projectId, studentId } },
        create: {
          projectId,
          studentId,
          umkmId,
          status: 'ACTIVE',
          progressPercent: 0,
        },
        update: {
          status: 'ACTIVE',
        },
      });
    });
  }

  async rejectApplication(projectId: string, studentId: string) {
    return prisma.projectApplication.update({
      where: { projectId_studentId: { projectId, studentId } },
      data: { status: 'REJECTED' }
    });
  }

  async createApplication(projectId: string, studentId: string) {
    return prisma.projectApplication.create({
      data: {
        projectId,
        studentId,
        status: 'PENDING'
      }
    });
  }
}

export const projectRepository = new ProjectRepository();

