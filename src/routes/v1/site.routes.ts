import express from "express";
import validateResource from "../../middlewares/validateResource";
import requireUser from "../../middlewares/requireUser";

import { fieldSiteSchema } from "../../schema/site.schema";

import {
  getSiteHandler,
  updateSiteHandler,
} from "../../controllers/site.controller";

const router = express.Router();

router
  .route("/site")
  .get(requireUser, getSiteHandler)
  .put(requireUser, validateResource(fieldSiteSchema), updateSiteHandler);

export default router;
