import { Router } from "express";
import requireUser from "../../middlewares/requireUser";
import validateResource from "../../middlewares/validateResource";
import {
  createItemSchema,
  findItemSchema,
  updateItemSchema,
  deleteItemSchema,
} from "../../schema/item.schema";

import {
  getItemsHandler,
  createItemHandler,
  updateItemHandler,
  deleteItemHandler,
} from "../../controllers/item.controller";

const router = Router();

router
  .route("/category/:categoryId")
  .get(requireUser, validateResource(findItemSchema), getItemsHandler)
  .post(requireUser, validateResource(createItemSchema), createItemHandler);

router
  .route("/:itemId")
  .put(requireUser, validateResource(updateItemSchema), updateItemHandler)
  .delete(requireUser, validateResource(deleteItemSchema), deleteItemHandler);

export default router;
