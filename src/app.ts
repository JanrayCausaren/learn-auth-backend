import express, { type NextFunction , type Request, type Response } from "express";
import routerLevelRoutes from "./middleware/router.level.routes.js";

const app = express();


app.use((req, res, next) => {
  console.log("Request received:", req.method, req.url);
  next();
} );
app.use((req, res, next) => {
  console.log("Time:", new Date().toISOString());
  next();
} );

app.use(
  '/login',
  (req: Request, res: Response, next: NextFunction) => {
    console.log('Request URL:', req.originalUrl);
    next();
  },
  (req: Request, res: Response, next: NextFunction) => {
    console.log('Request Type:', req.method);
    next();
  }
);


app.get("/janr", (req, res) => {
  res.json({
    message: "Hi Janray",
  });
});
app.get("/login", (req, res) => {
  res.json({
    message: "this is a login page",
  });
  console.log("Login page accessed");
});

app.use("/router-level", routerLevelRoutes);



app.listen(3000, () => {
  console.log("Application listening at http://localhost:3000");
});