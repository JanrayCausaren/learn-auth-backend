import express, {
  type NextFunction,
  type Request,
  type Response,
} from "express";
import routerLevelRoutes from "./middleware/router.level.routes.js";
import loginRoutes from "./feature/auth/login/login.routes.js";
import authRoutes from "./feature/auth/auth.routes.js";
import { ZodError } from "zod";

const app = express();

app.use(express.json())

app.use("/login", loginRoutes);
app.use("/auth", authRoutes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof ZodError) {
    return res.status(400).json({
      message: "Validation failed",
      errors: err.issues.map((issue) => ({
        field: issue.path.join("."),
        message: issue.message,
      })),
    });
  }

  return res.status(500).json({
    message: err.message,
  });
});

app.listen(3000, () => {
  console.log("Application listening at http://localhost:3000");
});
