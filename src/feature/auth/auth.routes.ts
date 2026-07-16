import { Router } from "express";
import { type Request, type Response, type NextFunction } from "express";
import { login, register } from "./auth.controller.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { validateRequest } from "../../middleware/validateRequest.js";
import { registerRequest } from "./auth.schema.js";

const router = Router();

router.post("/register", validateRequest(registerRequest) , asyncHandler(register));
router.post("/login", asyncHandler(login));
 
export default router;
