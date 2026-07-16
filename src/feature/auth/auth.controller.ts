import { type Request, type Response, type NextFunction } from "express";
import { loginService, registerService } from "./auth.services.js";
import { loginBodySchema, registerBodySchema, type RegisterBody } from "./auth.schema.js";
import { successResponse } from "../../utils/success.js";

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

  // return res.status(201).json(user);
  return successResponse({
    res,
    statusCode: 201,
    data: user,
    message: "User Registered Successfully",
  });
}

export async function login(req: Request, res: Response) {
  const reqBody = loginBodySchema.parse(req.body);
  const login = await loginService(reqBody);

  return successResponse({
    res,
    statusCode: 200,
    data: login,
    message: "Login Successfully",
  });
}

