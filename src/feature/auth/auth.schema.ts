import { z } from "zod";
import type { RequestSchema } from "../../middleware/validateRequest";

export const registerBodySchema = z.object({
  username: z.string().min(2).max(100),
  password: z.string().min(6).max(100),
  email: z.email(),
});

export const loginBodySchema = z.object({
  username: z.string().min(2).max(100),
  password: z.string().min(6).max(100),
  email: z.email(),
});

export const registerRequest = z.object({
  body: registerBodySchema,
  params: z.any().optional(),
  query: z.any().optional(),
});

export const loginRequest = z.object({
  body: registerBodySchema,
  params: z.any().optional(),
  query: z.any().optional(),
});




export type RegisterBody = z.infer<typeof registerBodySchema>;
export type LoginBody = z.infer<typeof loginBodySchema>;
