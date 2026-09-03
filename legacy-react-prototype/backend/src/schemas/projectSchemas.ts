import { z } from 'zod';

export const createProjectSchema = z.object({
  body: z.object({
    title: z.string().trim().min(3, 'Title must be at least 3 characters').max(150, 'Title too long'),
    category: z.string().trim().min(1, 'Category is required'),
    level: z.enum(['Beginner', 'Intermediate', 'Advanced']).default('Beginner'),
    duration: z.string().trim().min(1, 'Duration is required'),
    stipend: z.string().trim().optional().default('Unpaid'),
    description: z.string().trim().min(10, 'Description must be at least 10 characters'),

    overview: z.string().optional(),
    objectives: z.array(z.string()).optional().default([]),
    deliverables: z.array(z.string()).optional().default([]),
    tags: z.array(z.string()).optional().default([]),
    teamSize: z.string().optional().default('1 Student'),
    status: z.enum(['PUBLISHED', 'ACTIVE', 'DRAFT']).optional().default('PUBLISHED'),
    deadline: z.string().datetime().optional().or(z.string().regex(/^\d{4}-\d{2}-\d{2}/).optional()),
  }),
});


export const projectParamsSchema = z.object({
  params: z.object({
    id: z.string().min(1, 'Project ID is required'),
    studentId: z.string().optional(),
  }),
});
