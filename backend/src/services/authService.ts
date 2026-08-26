import bcrypt from 'bcryptjs';
import jwt, { SignOptions } from 'jsonwebtoken';
import { env } from '../config/env';
import { userRepository } from '../repositories/userRepository';
import { AppError } from '../utils/AppError';

export class AuthService {
  generateToken(id: string, role: string, tokenVersion: number) {
    const options: SignOptions = {
      expiresIn: env.JWT_EXPIRES_IN as any,
    };
    return jwt.sign({ id, role, tokenVersion }, env.JWT_SECRET, options);
  }

  async registerUser(data: { name: string; email: string; password: string; role: 'student' | 'umkm' }) {
    const { name, email, password, role } = data;
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
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: userRole.toLowerCase(),
        avatar: user.avatar,
      },
      token,
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
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role.toLowerCase(),
        avatar: user.avatar,
      },
      token,
    };
  }
}

export const authService = new AuthService();
