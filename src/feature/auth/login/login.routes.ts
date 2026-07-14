import { Router } from "express";
import { type Request, type Response, type NextFunction } from "express";
import { login } from "./login.controller.js";


const router = Router();

router.get("/", login);

export default router;
