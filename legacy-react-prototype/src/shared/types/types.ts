export type Role = 'student' | 'umkm' | 'admin' | 'guest';

export interface Certificate {
  id?: string;
  title: string;
  issuer: string;
  date?: string;
  fileUrl?: string;
}

export interface ReviewItem {
  id: string;
  authorName: string;
  companyName?: string;
  rating: number;
  comment: string;
  createdAt: string;
  projectName?: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatar: string;
  institution?: string;
  companyName?: string;
  portfolioScore?: number;
  completedProjectsCount?: number;
  projectsCompleted?: number;
  skills?: string[];
  bio?: string;
  certificates?: Certificate[];
  reviews?: ReviewItem[];
  location?: string;
  industry?: string;
  website?: string;
  instagram?: string;
  phone?: string;
  businessScale?: string;
  companyLogo?: string;
  totalProjectsPosted?: number;
  activeProjectsCount?: number;
  talentsCollaboratedCount?: number;
  projects?: Project[];
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
  hasApplied?: boolean;
  applicationStatus?: string;
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
  certificates?: Certificate[];
  reviews?: ReviewItem[];
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
  status: 'PUBLISHED' | 'ACTIVE' | 'COMPLETED' | 'DRAFT' | 'REJECTED';
  assignedStudent?: string;
  assignedStudentAvatar?: string;
  progressPercent: number;
  lastUpdate: string;
  applicationsCount?: number;
  applicantsCount?: number;
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
