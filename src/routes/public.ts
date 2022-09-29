import { Request, Response, Router } from "express";
import { limiter } from "../middlewares/limiter";
import { welcome } from "../controllers/public.controllers";

const router: Router = Router();

router.get("/", limiter, welcome);

router.get("/second-api", limiter, (req: Request, res: Response) => {
  res.send("second-api");
});
export default router;
