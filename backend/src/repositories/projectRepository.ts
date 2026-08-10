import prisma from '../utils/prisma';

export class ProjectRepository {
  async findPublishedProjects() {
    return prisma.project.findMany({
      where: { status: { in: ['PUBLISHED', 'ACTIVE'] } },
      include: {
        owner: {
          select: { name: true, umkmProfile: { select: { companyLogo: true } } }
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
          select: { name: true, umkmProfile: { select: { companyLogo: true, industry: true } } }
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
}

export const projectRepository = new ProjectRepository();
