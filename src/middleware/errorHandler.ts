import { type Request, type Response, type NextFunction } from "express";
import { ZodError } from "zod";



export function errorHandler(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  if (err instanceof ZodError) {
    return res.status(400).json({
      message: "Validation failed",
      errors: err.issues.map((issue) => ({
        field: issue.path.join("."),
        message: issue.message,
      })),
    });
  }

  res.status(500).json({
    message: err.message,
  });
}
