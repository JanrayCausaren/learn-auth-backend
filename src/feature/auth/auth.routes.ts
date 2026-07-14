import { Router } from "express";
import { type Request, type Response, type NextFunction } from 'express';
import { register } from "./auth.controller.js";

const router = Router();

router.post("/register", register);

router.get("/login", (req: Request, res: Response) => {
    res.json({ message: "Login page" });
});

export default router;
