import { Request, Response, Router } from "express";
import { verifyToken } from "../middlewares/verifyToken";
import { limiter } from "../middlewares/limiter";
import { welcome } from "../controllers/auth.controllers";

const router: Router = Router();

router.get("/", verifyToken, limiter, welcome);

router.get(
  "/second-api",
  verifyToken,
  limiter,
  (req: Request, res: Response) => {
    res.send("second-api");
  }
);

export default router;
