import prisma from '../utils/prisma';
import { AppError } from '../utils/AppError';
import { notificationService } from './notificationService';

export class WorkspaceService {
  async getWorkspaceByProjectId(projectId: string, userId: string) {
    const project = await prisma.project.findUnique({
      where: { id: projectId },
      include: {
        owner: {
          select: {
            id: true,
            name: true,
            avatar: true,
            umkmProfile: { select: { companyName: true, companyLogo: true, location: true, industry: true } }
          }
        },
        category: { select: { name: true } },
        applications: {
          where: { status: 'ACCEPTED' },
          include: {
            student: {
              select: {
                id: true,
                name: true,
                avatar: true,
                studentProfile: { select: { institution: true, skills: true, portfolioScore: true } }
              }
            }
          }
        },
        workspaces: {
          include: {
            tasks: { orderBy: { createdAt: 'asc' } },
            student: {
              select: {
                id: true,
                name: true,
                avatar: true,
                studentProfile: { select: { institution: true, skills: true } }
              }
            },
            umkm: {
              select: {
                id: true,
                name: true,
                avatar: true,
                umkmProfile: { select: { companyName: true, companyLogo: true } }
              }
            }
          }
        }
      }
    });

    if (!project) {
      throw new AppError('Project not found', 404);
    }

    // Check authorization: user must be project owner, accepted student, or admin
    const isOwner = project.ownerId === userId;
    const acceptedApp = project.applications.find(a => a.studentId === userId);
    const isAcceptedStudent = Boolean(acceptedApp);

    // If not owner and not accepted student, check if user is a member of any workspace for this project
    let workspace = project.workspaces.find(w => w.studentId === userId || w.umkmId === userId) || project.workspaces[0];

    // If no workspace exists yet but project has accepted student or owner is viewing, auto-initialize
    if (!workspace && project.applications.length > 0) {
      const studentId = project.applications[0].studentId;
      workspace = await prisma.workspace.create({
        data: {
          projectId: project.id,
          studentId: studentId,
          umkmId: project.ownerId,
          status: project.status === 'COMPLETED' ? 'COMPLETED' : 'ACTIVE',
          progressPercent: project.status === 'COMPLETED' ? 100 : 25,
        },
        include: {
          tasks: { orderBy: { createdAt: 'asc' } },
          student: {
            select: {
              id: true,
              name: true,
              avatar: true,
              studentProfile: { select: { institution: true, skills: true } }
            }
          },
          umkm: {
            select: {
              id: true,
              name: true,
              avatar: true,
              umkmProfile: { select: { companyName: true, companyLogo: true } }
            }
          }
        }
      });

      // Auto-populate default milestone tasks from project.deliverables if present
      let deliverablesList: string[] = [];
      try {
        deliverablesList = JSON.parse(project.deliverables || '[]');
      } catch {
        deliverablesList = [];
      }

      if (deliverablesList.length > 0) {
        for (let i = 0; i < deliverablesList.length; i++) {
          const title = deliverablesList[i];
          const dueDays = (i + 1) * 7;
          await prisma.projectTask.create({
            data: {
              workspaceId: workspace.id,
              title: title,
              completed: false,
              dueDate: new Date(Date.now() + dueDays * 24 * 60 * 60 * 1000),
              assignedTo: project.applications[0].student?.name || 'Student Collaborator'
            }
          });
        }
      } else {
        // Fallback default starter tasks
        const defaultTasks = [
          'Requirement kickoff & sprint roadmap alignment',
          'Design architecture & wireframes specification',
          'Core feature implementation & integration',
          'Final QA testing, documentation & project handoff'
        ];
        for (let i = 0; i < defaultTasks.length; i++) {
          await prisma.projectTask.create({
            data: {
              workspaceId: workspace.id,
              title: defaultTasks[i],
              completed: i === 0,
              dueDate: new Date(Date.now() + (i + 1) * 7 * 24 * 60 * 60 * 1000),
              assignedTo: project.applications[0].student?.name || 'Student Collaborator'
            }
          });
        }
      }

      // Re-fetch with newly created tasks
      workspace = await prisma.workspace.findUnique({
        where: { id: workspace.id },
        include: {
          tasks: { orderBy: { createdAt: 'asc' } },
          student: {
            select: {
              id: true,
              name: true,
              avatar: true,
              studentProfile: { select: { institution: true, skills: true } }
            }
          },
          umkm: {
            select: {
              id: true,
              name: true,
              avatar: true,
              umkmProfile: { select: { companyName: true, companyLogo: true } }
            }
          }
        }
      }) as any;
    }

    // If workspace exists but has 0 tasks, populate from project deliverables
    if (workspace && (!workspace.tasks || workspace.tasks.length === 0)) {
      let deliverablesList: string[] = [];
      try {
        deliverablesList = JSON.parse(project.deliverables || '[]');
      } catch {
        deliverablesList = [];
      }

      if (deliverablesList.length > 0) {
        for (let i = 0; i < deliverablesList.length; i++) {
          const title = deliverablesList[i];
          const dueDays = (i + 1) * 7;
          await prisma.projectTask.create({
            data: {
              workspaceId: workspace.id,
              title: title,
              completed: false,
              dueDate: new Date(Date.now() + dueDays * 24 * 60 * 60 * 1000),
              assignedTo: workspace.student?.name || 'Student Collaborator'
            }
          });
        }
      } else {
        const defaultTasks = [
          'Requirement kickoff & sprint roadmap alignment',
          'Design architecture & wireframes specification',
          'Core feature implementation & integration',
          'Final QA testing, documentation & project handoff'
        ];
        for (let i = 0; i < defaultTasks.length; i++) {
          await prisma.projectTask.create({
            data: {
              workspaceId: workspace.id,
              title: defaultTasks[i],
              completed: i === 0,
              dueDate: new Date(Date.now() + (i + 1) * 7 * 24 * 60 * 60 * 1000),
              assignedTo: workspace.student?.name || 'Student Collaborator'
            }
          });
        }
      }

      const updatedTasks = await prisma.projectTask.findMany({
        where: { workspaceId: workspace.id },
        orderBy: { createdAt: 'asc' }
      });
      workspace.tasks = updatedTasks;
    }

    if (!workspace) {

      // Return lightweight placeholder state for projects not yet accepted
      return {
        id: 'draft-workspace',
        projectId: project.id,
        project: {
          id: project.id,
          title: project.title,
          status: project.status,
          duration: project.duration,
          stipend: project.stipend,
          category: project.category?.name || 'General',
          owner: project.owner,
        },
        status: project.status,
        progressPercent: 0,
        currentPhase: 'Sprint 1: Planning & Setup',
        tasks: [],
        deliverables: project.deliverables ? JSON.parse(project.deliverables) : [],
        student: project.applications[0]?.student || null,
        umkm: project.owner,
      };
    }

    // Determine current phase based on progress percentage
    let currentPhase = 'Sprint 1: Planning & Alignment';
    if (workspace.progressPercent >= 100 || workspace.status === 'COMPLETED') {
      currentPhase = 'Completed & Handed Off';
    } else if (workspace.progressPercent >= 75) {
      currentPhase = 'Sprint 4: Final QA & Hand-off';
    } else if (workspace.progressPercent >= 50) {
      currentPhase = 'Sprint 3: Core Implementation';
    } else if (workspace.progressPercent >= 25) {
      currentPhase = 'Sprint 2: UI Design & Prototyping';
    }

    return {
      id: workspace.id,
      projectId: project.id,
      project: {
        id: project.id,
        title: project.title,
        status: project.status,
        duration: project.duration,
        stipend: project.stipend,
        category: project.category?.name || 'General',
        owner: project.owner,
      },
      status: workspace.status,
      progressPercent: workspace.progressPercent,
      currentPhase,
      tasks: workspace.tasks.map(t => ({
        id: t.id,
        title: t.title,
        completed: t.completed,
        dueDate: t.dueDate.toISOString().split('T')[0],
        assignedTo: t.assignedTo || 'Collaborator'
      })),
      deliverables: project.deliverables ? JSON.parse(project.deliverables) : [],
      student: workspace.student,
      umkm: workspace.umkm,
      createdAt: workspace.createdAt,
    };
  }

  async addTask(workspaceId: string, userId: string, data: { title: string; dueDate?: string; assignedTo?: string }) {
    const workspace = await prisma.workspace.findUnique({
      where: { id: workspaceId },
      include: { tasks: true, project: true }
    });
    if (!workspace) throw new AppError('Workspace not found', 404);

    const task = await prisma.projectTask.create({
      data: {
        workspaceId,
        title: data.title.trim(),
        dueDate: data.dueDate ? new Date(data.dueDate) : new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        assignedTo: data.assignedTo || 'Student Collaborator',
        completed: false,
      }
    });

    await this.recalculateProgress(workspaceId);
    return task;
  }

  async toggleTask(workspaceId: string, taskId: string, userId: string, completed?: boolean) {
    const task = await prisma.projectTask.findUnique({
      where: { id: taskId }
    });
    if (!task) throw new AppError('Task not found', 404);

    const newStatus = completed !== undefined ? completed : !task.completed;

    const updatedTask = await prisma.projectTask.update({
      where: { id: taskId },
      data: { completed: newStatus }
    });

    await this.recalculateProgress(workspaceId);
    return updatedTask;
  }

  async deleteTask(workspaceId: string, taskId: string, userId: string) {
    const task = await prisma.projectTask.findUnique({
      where: { id: taskId }
    });
    if (!task) throw new AppError('Task not found', 404);

    await prisma.projectTask.delete({
      where: { id: taskId }
    });

    await this.recalculateProgress(workspaceId);
    return { success: true };
  }

  async updatePhaseProgress(workspaceId: string, userId: string, progressPercent: number) {
    const workspace = await prisma.workspace.findUnique({
      where: { id: workspaceId }
    });
    if (!workspace) throw new AppError('Workspace not found', 404);

    return prisma.workspace.update({
      where: { id: workspaceId },
      data: { progressPercent: Math.min(100, Math.max(0, progressPercent)) }
    });
  }

  private async recalculateProgress(workspaceId: string) {
    const allTasks = await prisma.projectTask.findMany({
      where: { workspaceId }
    });

    if (allTasks.length === 0) return;

    const completedTasks = allTasks.filter(t => t.completed).length;
    const progressPercent = Math.round((completedTasks / allTasks.length) * 100);

    await prisma.workspace.update({
      where: { id: workspaceId },
      data: { progressPercent }
    });
  }
}

export const workspaceService = new WorkspaceService();
