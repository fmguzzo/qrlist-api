import { Router } from "express";
import requireUser from "../../middlewares/requireUser";
import { createListSchema } from "../../schema/list.schema";
import validateResource from "../../middlewares/validateResource";

import {
  getAllListHandler,
  getListHandler,
  createListHandler,
  updateListHandler,
  deleteListHandler,
} from "../../controllers/list.controller";

const router = Router();

router
  .route("/site/:siteId")
  .get(requireUser, getAllListHandler)
  .post(requireUser, validateResource(createListSchema), createListHandler);

router
  .route("/:listId")
  .get(requireUser, getListHandler)
  .put(requireUser, updateListHandler)
  .delete(requireUser, deleteListHandler);

export default router;
