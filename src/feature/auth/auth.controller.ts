import { type Request, type Response, type NextFunction } from "express";
import { registerService } from "./auth.services.js";
import { registerBodySchema } from "./auth.schema.js";

export async function register(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const reqBody = registerBodySchema.parse(req.body);
    const user = await registerService(reqBody);
    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
}
