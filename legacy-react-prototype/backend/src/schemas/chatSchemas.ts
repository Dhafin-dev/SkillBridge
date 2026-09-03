import { z } from 'zod';

export const sendMessageSchema = z.object({
  body: z.object({
    projectId: z.string().optional(),
    text: z.string().trim().min(1, 'Message text cannot be empty').max(2000, 'Message is too long'),
    receiverId: z.string().optional(),
  }),
});


export const getChatQuerySchema = z.object({
  query: z.object({
    projectId: z.string().optional(),
  }).optional(),
  params: z.object({
    projectId: z.string().optional(),
  }).optional(),
});
