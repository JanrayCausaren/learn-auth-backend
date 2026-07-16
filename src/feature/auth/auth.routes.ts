import { Router } from "express";
import { type Request, type Response, type NextFunction } from "express";
import { login, register } from "./auth.controller.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { validateRequest } from "../../middleware/validateRequest.js";
import { loginRequest, registerRequest } from "./auth.schema.js";
import { limiter } from "../../middleware/rateLimit.js";

const router = Router();

router.post(
  "/register",
  validateRequest(registerRequest),
  asyncHandler(register),
);

router.post(
  "/login",
  limiter,
  validateRequest(loginRequest),
  asyncHandler(login),
);

export default router;
