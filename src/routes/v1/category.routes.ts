import { Router } from "express";
import requireUser from "../../middlewares/requireUser";
import {
  getAllCategoryHandler,
  createCategoryHandler,
  updateCategoryHandler,
  deleteCategoryHandler,
} from "../../controllers/category.controller";

const router = Router();

router
  .route("/list/:listId")
  .get(requireUser, getAllCategoryHandler)
  .post(requireUser, createCategoryHandler);
router
  .route("/:categoryId")
  .delete(requireUser, deleteCategoryHandler)
  .put(requireUser, updateCategoryHandler);

export default router;
