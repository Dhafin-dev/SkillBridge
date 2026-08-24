import bcrypt from 'bcryptjs';
import jwt, { SignOptions } from 'jsonwebtoken';
import { env } from '../config/env';
import { userRepository } from '../repositories/userRepository';

export class AuthService {
  generateToken(id: string, role: string) {
    const options: SignOptions = {
      expiresIn: env.JWT_EXPIRES_IN as any,
    };
    return jwt.sign({ id, role }, env.JWT_SECRET, options);
  }

  async registerUser(data: any) {
    const { name, email, password, role } = data;
    const existingUser = await userRepository.findByEmail(email);
    if (existingUser) {
      throw new Error('User already exists');
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const userRole = role === 'student' ? 'STUDENT' : (role === 'umkm' ? 'UMKM' : 'ADMIN');
    
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

    const token = this.generateToken(user.id, userRole.toLowerCase());

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

  async loginUser(data: any) {
    const { email, password } = data;
    const user = await userRepository.findByEmail(email);
    if (!user) {
      throw new Error('Invalid credentials');
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      throw new Error('Invalid credentials');
    }

    const token = this.generateToken(user.id, user.role.toLowerCase());

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
