import express, {
  Router,
  type Response,
  type Request,
  type NextFunction,
} from "express";

const router = express.Router();

router.use((req: Request, res: Response, next: NextFunction) => {
  console.log("Request URL: Router Level ------", req.originalUrl);
  next();
});

router.get("/", (req: Request, res: Response) => {
  throw new Error("Error  ocuur");

  //   res.json({
  //     message: "ROUTERRRR LEVEL INDEX",
  //   });
});
router.get("/new", (req: Request, res: Response) => {
  res.json({
    message: "this is a router-level middle ware",
  });
});

router.get("/new2", (req: Request, res: Response) => {
  res.json({
    message: "this is a page",
  });
  console.log("Login page accessed");
});

export default router;
