import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import jwt, { SignOptions } from 'jsonwebtoken';
import { env } from '../config/env';
import { userRepository } from '../repositories/userRepository';
import { AppError } from '../utils/AppError';

interface ResetTokenInfo {
  userId: string;
  expiresAt: number;
}

const passwordResetTokens = new Map<string, ResetTokenInfo>();

const ALLOWED_REGISTRATION_ROLES = ['student', 'umkm'] as const;
type AllowedRole = (typeof ALLOWED_REGISTRATION_ROLES)[number];

export class AuthService {
  generateToken(id: string, role: string, tokenVersion: number) {
    const options: SignOptions = {
      expiresIn: env.JWT_EXPIRES_IN as any,
    };
    return jwt.sign({ id, role, tokenVersion }, env.JWT_SECRET, options);
  }

  async registerUser(data: { name: string; email: string; password: string; role: string }) {
    const { name, email, password, role } = data;

    // P0: Strict role allow-list check. Never allow admin creation through registration.
    if (!role || !ALLOWED_REGISTRATION_ROLES.includes(role as AllowedRole)) {
      throw new AppError('Invalid registration role. Only student and umkm registrations are permitted.', 400);
    }

    const existingUser = await userRepository.findByEmail(email);
    if (existingUser) {
      throw new AppError('An account with this email already exists', 409);
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const userRole = role === 'student' ? 'STUDENT' : 'UMKM';
    
    const user = await userRepository.create({
      name,
      email,
      passwordHash,
      role: userRole,
      avatar: '',
      studentProfile: userRole === 'STUDENT' ? {
        create: { skills: '[]' }
      } : undefined,
      umkmProfile: userRole === 'UMKM' ? {
        create: { companyName: `${name} Business` }
      } : undefined,
    });

    const token = this.generateToken(user.id, userRole.toLowerCase(), user.tokenVersion);

    return {
      user: this.formatUserProfile(user),
      token,
    };
  }

  formatUserProfile(user: any) {
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

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role.toLowerCase(),
      avatar: user.avatar || '',
      bio: user.bio || '',
      isVerified: user.isVerified || false,
      portfolioScore: user.studentProfile?.portfolioScore ?? 85,
      projectsCompleted: user.studentProfile?.completedProjectsCount ?? 0,
      completedProjectsCount: user.studentProfile?.completedProjectsCount ?? 0,
      institution: user.studentProfile?.institution || '',
      companyName: user.umkmProfile?.companyName || '',
      skills: user.role === 'STUDENT' ? parsedSkills : [],
    };
  }

  async loginUser(data: { email: string; password: string }) {
    const { email, password } = data;
    const user = await userRepository.findByEmail(email);
    if (!user) {
      throw new AppError('Invalid credentials', 401);
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      throw new AppError('Invalid credentials', 401);
    }

    const token = this.generateToken(user.id, user.role.toLowerCase(), user.tokenVersion);

    return {
      user: this.formatUserProfile(user),
      token,
    };
  }


  async requestPasswordReset(email: string) {
    const user = await userRepository.findByEmail(email);
    // Generic response to prevent user enumeration
    if (!user) {
      return { message: 'If an account exists with this email, a password reset link has been issued.' };
    }

    const token = crypto.randomBytes(32).toString('hex');
    const expiresAt = Date.now() + 60 * 60 * 1000; // 1 hour validity

    passwordResetTokens.set(token, { userId: user.id, expiresAt });

    // In development / demo environment without SMTP, include token in response
    return {
      message: 'Password reset link has been sent to your email.',
      resetToken: env.NODE_ENV !== 'production' ? token : undefined,
    };
  }

  async resetPassword(token: string, newPassword: string) {
    const record = passwordResetTokens.get(token);
    if (!record || record.expiresAt < Date.now()) {
      if (record) passwordResetTokens.delete(token);
      throw new AppError('Invalid or expired password reset token', 400);
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(newPassword, salt);

    await userRepository.updatePassword(record.userId, passwordHash);
    passwordResetTokens.delete(token);

    return { message: 'Password has been reset successfully. Please log in with your new password.' };
  }
}

export const authService = new AuthService();
