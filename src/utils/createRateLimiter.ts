import rateLimit from "express-rate-limit";
import { type Request, type Response, type NextFunction } from "express";
import { errorResponse } from "./error";

interface RateLimiterOptions {
  limit: number;
  windowMs: number;
  message?: string;
}

export function createRateLimiter({
  limit,
  message = "Too many requests. Please try again later.",
  windowMs,
}: RateLimiterOptions) {
  return rateLimit({
    limit: limit,
    windowMs: windowMs,
    standardHeaders: true,
    legacyHeaders: false,
    handler: (_req: Request, res: Response) => {
      return errorResponse({
        res,
        statusCode: 429,
        errorCode: "RATE_LIMIT",
        message: message,
      });
    },
  });
}
