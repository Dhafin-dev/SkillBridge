import { Router } from 'express';
import { changePassword, getRecommendedStudents, getUserById, updateMe, inviteStudent } from '../controllers/userController';
import { getMe } from '../controllers/authController';
import { authenticate, optionalAuthenticate, requireRole } from '../middleware/auth';
import { validate } from '../middleware/validate';
import { z } from 'zod';

const router = Router();

const updateProfileSchema = z.object({
  body: z.object({
    name: z.string().trim().min(2).max(100).optional(),
    bio: z.string().max(600).optional(),
    avatar: z.string().optional(),
    headline: z.string().max(150).optional(),
    institution: z.string().max(150).optional(),
    companyName: z.string().max(150).optional(),
    industry: z.string().max(100).optional(),
    location: z.string().max(200).optional(),
    website: z.string().max(255).optional(),
    instagram: z.string().max(100).optional(),
    phone: z.string().max(50).optional(),
    businessScale: z.string().max(100).optional(),
    skills: z.array(z.string()).optional(),
    certificates: z.array(z.object({
      id: z.string().optional(),
      title: z.string(),
      issuer: z.string(),
      date: z.string().optional(),
      fileUrl: z.string().optional(),
    })).optional(),
  }),
});



const changePasswordSchema = z.object({
  body: z.object({
    currentPassword: z.string().min(1, 'Current password is required'),
    newPassword: z.string().min(8, 'New password must be at least 8 characters').max(128),
  }),
});

router.get('/students/recommended', optionalAuthenticate, getRecommendedStudents);
router.get('/me', authenticate, getMe);
router.get('/:id', getUserById);
router.patch('/me', authenticate, validate(updateProfileSchema), updateMe);
router.patch('/me/password', authenticate, validate(changePasswordSchema), changePassword);
router.post('/:id/invite', authenticate, requireRole(['UMKM', 'ADMIN']), inviteStudent);

export default router;



