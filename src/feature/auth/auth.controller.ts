import { type Request, type Response, type NextFunction } from "express";
import { loginService, registerService } from "./auth.services.js";
import { loginBodySchema, registerBodySchema } from "./auth.schema.js";

// handler if not using async handler utils
// export async function register(
//   req: Request,
//   res: Response,
//   next: NextFunction,
// ) {
//   try {
//     const reqBody = registerBodySchema.parse(req.body);
//     const user = await registerService(reqBody);
//     res.status(201).json(user);
//   } catch (err) {
//     next(err);
//   }
// }

export async function register(req: Request, res: Response) {
  const reqBody = registerBodySchema.parse(req.body);
  const user = await registerService(reqBody);
  return res.status(201).json(user);
}

export async function login(req: Request, res: Response) {
  const reqBody = loginBodySchema.parse(req.body);
  const login = await loginService(reqBody);

  return res.status(200).json({
    message: "Success",
  });
}
