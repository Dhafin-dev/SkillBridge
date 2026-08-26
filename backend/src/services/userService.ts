import { userRepository } from '../repositories/userRepository';
import bcrypt from 'bcryptjs';
import { AppError } from '../utils/AppError';

export class UserService {
  async getRecommendedStudents() {
    const students = await userRepository.findStudents();
    
    return students.map(s => ({
      id: s.id,
      name: s.name,
      avatar: s.avatar || '',
      institution: s.studentProfile?.institution || 'Unknown',
      matchScore: Math.min(100, (s.studentProfile?.portfolioScore || 0) + (JSON.parse(s.studentProfile?.skills || '[]').length * 5) + ((s.studentProfile?.completedProjectsCount || 0) * 10)),
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
      bio: user.bio,
      skills: user.role === 'STUDENT' ? JSON.parse(user.studentProfile?.skills || '[]') : [],
    };
  }

  async updateProfile(userId: string, data: any) {
    const user = await userRepository.findById(userId);
    if (!user) throw new Error('User not found');

    const updateData: any = {};
    if (data.name !== undefined) updateData.name = data.name;
    if (data.bio !== undefined) updateData.bio = data.bio;
    if (data.avatar !== undefined) updateData.avatar = data.avatar;

    if (user.role === 'STUDENT' && (data.headline !== undefined || data.institution !== undefined || data.skills !== undefined)) {
      updateData.studentProfile = {
        update: {}
      };
      if (data.headline !== undefined) updateData.studentProfile.update.institution = data.headline;
      if (data.institution !== undefined) updateData.studentProfile.update.institution = data.institution;
      if (data.skills !== undefined) updateData.studentProfile.update.skills = JSON.stringify(data.skills);
    } else if (user.role === 'UMKM' && (data.headline !== undefined || data.institution !== undefined)) {
      updateData.umkmProfile = {
        update: {
          companyName: data.headline || data.institution
        }
      };
    }

    return import('../utils/prisma').then(({ default: prisma }) => {
       return prisma.user.update({
         where: { id: userId },
         data: updateData
       });
    });
  }

  async changePassword(userId: string, currentPassword: string, newPassword: string) {
    const user = await userRepository.findById(userId);
    if (!user || !(await bcrypt.compare(currentPassword, user.passwordHash))) {
      throw new AppError('Current password is incorrect', 400);
    }
    const passwordHash = await bcrypt.hash(newPassword, 12);
    return userRepository.updatePassword(userId, passwordHash);
  }
}

export const userService = new UserService();
