import { projectRepository } from '../repositories/projectRepository';
import { notificationService } from './notificationService';
import { userRepository } from '../repositories/userRepository';

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

  async getProjectById(id: string) {
    const project = await projectRepository.findById(id);
    if (!project) throw new Error('Project not found');

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
      _count: (project as any)._count,
      applications: project.applications.map((app: any) => ({
        id: app.id,
        status: app.status,
        student: {
          id: app.student.id,
          name: app.student.name,
          avatar: app.student.avatar || 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
          institution: app.student.studentProfile?.institution || 'Unknown',
          skills: this.parseJson(app.student.studentProfile?.skills, []),
        },
      })),
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
      teamSize: data.teamSize || '1',
      ownerId: umkmId
    };
    return projectRepository.create(projectData);
  }

  async applyProject(projectId: string, studentId: string) {
    const project = await projectRepository.findById(projectId);
    if (!project) throw new Error('Project not found');
    
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
    if (!project) throw new Error('Project not found');
    if (project.ownerId !== umkmId) throw new Error('Unauthorized access');
    
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
    if (!project) throw new Error('Project not found');
    if (project.ownerId !== umkmId) throw new Error('Unauthorized access');
    
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

  private parseJson<T>(value: string | null | undefined, fallback: T): T {
    try {
      return value ? JSON.parse(value) : fallback;
    } catch {
      return fallback;
    }
  }
}

export const projectService = new ProjectService();
