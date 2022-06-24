import express, { Request, Response } from "express";
import userRoute from "./user.routes";
import authRoute from "./auth.routes";
import siteRoute from "./site.routes";

const router = express.Router();

router.get("/healthcheck", (_: Request, res: Response) => res.sendStatus(200));

router.use(userRoute);
router.use(authRoute);
router.use(siteRoute);

export default router;
