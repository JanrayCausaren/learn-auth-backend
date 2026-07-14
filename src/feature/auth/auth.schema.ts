
import { z } from 'zod';

export const registerBodySchema = z.object({
  username: z.string().min(2).max(100),
  password: z.string().min(6).max(100),
  email: z.email()
});


export type RegisterBody = z.infer<typeof registerBodySchema>;