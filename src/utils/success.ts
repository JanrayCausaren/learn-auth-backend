import { type Response } from "express";

interface SuccessResponseOptions<T> {
  res: Response;
  message?: string;
  statusCode?: number;
  data?: T;
}

export const successResponse = function <T>({
  message,
  statusCode,
  res,
  data,
}: SuccessResponseOptions<T>) {
  return res.status(statusCode || 200).json({
    success: true, 
    message: message ?? "Success",
    data: data ?? undefined,
  });
};
