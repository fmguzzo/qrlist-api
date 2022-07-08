import express, { Request, Response } from "express";
import userRoute from "./user.routes";
import authRoute from "./auth.routes";
import siteRoute from "./site.routes";
import listRoute from "./list.routes";
import categoryRoute from "./category.routes";
import itemRoute from "./item.routes";

// v1 router
const router = express.Router();

router.get("/healthcheck", (_: Request, res: Response) => res.sendStatus(200));

router.use(userRoute);
router.use(authRoute);
router.use(siteRoute);
router.use("/list", listRoute);
router.use("/category", categoryRoute);
router.use("/item", itemRoute);

export default router;
