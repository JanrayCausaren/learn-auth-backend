import { type Response } from "express";

interface ErrorResponseOptions<T> {
  res: Response;
  message?: string;
  statusCode?: number;
  errors?: T;
}

export const errorResponse = function <T>({
  message,
  statusCode,
  res,
  errors,
}: ErrorResponseOptions<T>) {
  return res.status(statusCode || 500).json({
    success: false,
    message: message ?? "Error: Something went wrong",
    errors: errors ?? undefined,
  });
};
