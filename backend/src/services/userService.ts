import { userRepository } from '../repositories/userRepository';

export class UserService {
  async getRecommendedStudents() {
    const students = await userRepository.findStudents();
    
    return students.map(s => ({
      id: s.id,
      name: s.name,
      avatar: s.avatar || '',
      institution: s.studentProfile?.institution || 'Unknown',
      matchScore: Math.floor(Math.random() * 20) + 80, // Mock score logic
      portfolioScore: s.studentProfile?.portfolioScore || 0,
      projectsCompleted: s.studentProfile?.completedProjectsCount || 0,
      skills: JSON.parse(s.studentProfile?.skills || '[]'),
      bio: s.bio || undefined,
    }));
  }

  async getMe(userId: string) {
    const user = await userRepository.findById(userId);
    if (!user) throw new Error('User not found');

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role.toLowerCase(),
      avatar: user.avatar,
      isVerified: user.isVerified,
      portfolioScore: user.studentProfile?.portfolioScore || 0,
      projectsCompleted: user.studentProfile?.completedProjectsCount || 0,
      institution: user.studentProfile?.institution || 'Unknown',
      companyName: user.umkmProfile?.companyName || 'Unknown',
    };
  }
}

export const userService = new UserService();
