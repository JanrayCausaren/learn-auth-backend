import express, {
  type NextFunction,
  type Request,
  type Response,
} from "express";
import routerLevelRoutes from "./middleware/router.level.routes.js";
import loginRoutes from "./feature/auth/login/login.routes.js";

const app = express();


//application level middleware 
app.use((req, res, next) => {
  console.log("Request received:", req.method, req.url);
  next();
});
app.use((req, res, next) => {
  console.log("Time:", new Date().toISOString());
  next();
});
// middleware that runs for all requests to the /login route
app.use(
  "/application-middleware",
  (req: Request, res: Response, next: NextFunction) => {
    console.log("Request URL:", req.originalUrl);
    next();
  },
  (req: Request, res: Response, next: NextFunction) => {
    console.log("Request Type:", req.method);
    next();
  },
);



// app.get("/try", getNoteById);
app.get("/try", (req, res, next) => {
  next(new Error("Something went wrong"));
});

app.get("/janr", (req, res) => {
  res.json({
    message: "Hi Janray",
  });
});

app.use("/router-level", routerLevelRoutes);
app.use("/login", loginRoutes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({
    message: err.message,
  });
});

app.listen(3000, () => {
  console.log("Application listening at http://localhost:3000");
});
