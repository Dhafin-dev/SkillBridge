import { z } from 'zod';

export const completeProjectSchema = z.object({
  body: z.object({
    rating: z.number().int().min(1, 'Rating must be at least 1').max(5, 'Rating cannot exceed 5'),
    comment: z.string().trim().min(5, 'Review comment must be at least 5 characters').max(1000, 'Review comment is too long'),
    studentId: z.string().min(1, 'Student ID is required'),
    feedbackTags: z.array(z.string()).optional(),
  }),
});
