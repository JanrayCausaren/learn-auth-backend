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

export const verifyEmailSchema = z.object({
  token: z.string().min(1),
});

export const resetPasswordTokenSchema = z.object({
  token: z.string().min(1, "Token is required"),
});

export const resetPasswordSchema = z
  .object({
    newPassword: z.string().min(6).max(100),
    confirmNewPassword: z.string().min(6).max(100),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    path: ["confirmNewPassword"],
    message: "Passwords do not match",
  });

export const forgotPasswordSchema = z.object({
  email: z.email(),
});

export const resetPasswordRequest = z.object({
  body: resetPasswordSchema,
  params: z.any().optional(),
  query: resetPasswordTokenSchema,
});

export const forgotPasswordRequest = z.object({
  body: forgotPasswordSchema,
  params: z.any().optional(),
  query: z.any().optional(),
});

export type ResetPasswordData = z.infer<typeof resetPasswordRequest>;
export type RegisterBody = z.infer<typeof registerBodySchema>;
export type LoginBody = z.infer<typeof loginBodySchema>;
