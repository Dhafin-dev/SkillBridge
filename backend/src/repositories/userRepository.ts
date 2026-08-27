import prisma from '../utils/prisma';
import { Prisma } from '@prisma/client';

export class UserRepository {
  async findByEmail(email: string) {
    return prisma.user.findUnique({
      where: { email },
      include: {
        studentProfile: true,
        umkmProfile: true,
      },
    });
  }


  async updatePassword(id: string, passwordHash: string) {
    return prisma.user.update({
      where: { id },
      data: { passwordHash, tokenVersion: { increment: 1 } },
      select: { id: true, role: true, tokenVersion: true },
    });
  }

  async findById(id: string) {
    return prisma.user.findUnique({
      where: { id },
      include: {
        studentProfile: true,
        umkmProfile: true,
      }
    });
  }

  async create(data: Prisma.UserCreateInput) {
    return prisma.user.create({
      data,
      include: {
        studentProfile: true,
        umkmProfile: true,
      }
    });
  }

  async findStudents() {
    return prisma.user.findMany({
      where: { role: 'STUDENT' },
      include: {
        studentProfile: true,
      }
    });
  }
}

export const userRepository = new UserRepository();
