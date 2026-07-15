import express, {
  type NextFunction,
  type Request,
  type Response,
} from "express";
import routerLevelRoutes from "./middleware/router.level.routes.js";
import authRoutes from "./feature/auth/auth.routes.js";
import { ZodError } from "zod";
import { errorHandler } from "./middleware/errorHandler.js";

const app = express();

app.use(express.json())

app.use("/auth", authRoutes);


app.use(errorHandler);

app.listen(3000, () => {
  console.log("Application listening at http://localhost:3000");
});
