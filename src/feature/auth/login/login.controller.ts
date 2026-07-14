import { type Request, type Response, type NextFunction } from 'express';

export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    res.json({
      message: 'Login successful',
    });
  } catch (err) {
    next(err);
  }
}