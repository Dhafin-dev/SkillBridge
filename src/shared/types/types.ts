export type Role = 'student' | 'umkm' | 'admin' | 'guest';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatar: string;
  institution?: string;
  portfolioScore?: number;
  completedProjectsCount?: number;
  skills?: string[];
  bio?: string;
}

export interface Project {
  id: string;
  title: string;
  companyName: string;
  companyLogo: string;
  matchScore: number;
  stipend: string;
  description: string;
  tags: string[];
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  appliedCount: number;
  featured?: boolean;
  category: 'Web Development' | 'UI/UX Design' | 'Marketing' | 'Software Development' | 'Data Science' | 'Mobile App';
  deadline?: string;
  teamSize?: string;
  overview?: string;
  objectives?: string[];
  deliverables?: string[];
  aboutUmkm?: string;
}

export interface StudentCandidate {
  id: string;
  name: string;
  avatar: string;
  institution: string;
  matchScore: number;
  portfolioScore: number;
  projectsCompleted: number;
  skills: string[];
  bio?: string;
}

export interface ActiveStudentProject {
  id: string;
  title: string;
  companyName: string;
  companyLogo?: string;
  status: 'In Progress' | 'Urgent' | 'Completed' | 'Pending';
  phaseName: string;
  dueDate: string;
  dueAlert?: boolean;
  progressPercent: number;
  category: string;
}

export interface ClientRequest {
  id: string;
  title: string;
  status: 'Active' | 'Pending' | 'Matched' | 'Draft' | 'Completed';
  assignedStudent?: string;
  assignedStudentAvatar?: string;
  progressPercent: number;
  lastUpdate: string;
  applicationsCount?: number;
}

export interface ChatMessage {
  id: string;
  sender: string;
  senderAvatar: string;
  isMe: boolean;
  text: string;
  timestamp: string;
}

export interface ProjectTask {
  id: string;
  title: string;
  completed: boolean;
  dueDate: string;
  assignedTo: string;
}

export interface NotificationItem {
  id: string;
  type: 'project' | 'system' | 'message';
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  relatedEntityId?: string;
  relatedEntityType?: string;
  actionRoute?: string;
}
