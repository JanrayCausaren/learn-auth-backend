import { Router } from "express";
import { type Request, type Response, type NextFunction } from "express";
import { login, register, resendVerification, verifyEmail } from "./auth.controller.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { validateRequest } from "../../middleware/validateRequest.js";
import { loginRequest, registerRequest } from "./auth.schema.js";
import { limiter, loginLimiter } from "../../middleware/rateLimit.js";

const router = Router();

router.post(
  "/register",
  validateRequest(registerRequest),
  asyncHandler(register),
);

router.post(
  "/login",
  loginLimiter,
  validateRequest(loginRequest),
  asyncHandler(login),
);

router.post("/verify-email", asyncHandler(verifyEmail));
router.post("/resend-verification", asyncHandler(resendVerification));

export default router;
