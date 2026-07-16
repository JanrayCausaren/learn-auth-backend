import { type Response } from "express";

interface ErrorResponseOptions<T> {
  res: Response;
  message?: string;
  statusCode?: number;
  errorCode?: string | undefined
  errors?: T;
  stackTrace?: any | undefined
}

export const errorResponse = function <T>({
  message,
  statusCode,
  res,
  errors,
  stackTrace, errorCode
}: ErrorResponseOptions<T>) {
  return res.status(statusCode || 500).json({
    success: false,
    message: message ?? "Error: Something went wrong",
    errorCode: errorCode,
    errors: errors ?? undefined,
    stack: stackTrace ?? undefined
  });
};
