import { Request, Response, NextFunction } from "express";
import status from "http-status";

import {
  findCategories,
  findCategoryById,
  createCategory,
  findCategory,
  deleteCategory,
  updateCategory,
} from "../services/category.service";

export async function getAllCategoryHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { listId } = req.params;
  try {
    const categories = await findCategories({ listId });
    res.json(categories);
  } catch (err: any) {
    next(err);
  }
}

export async function createCategoryHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { listId } = req.params;
  const { name } = req.body;

  try {
    const existCategory = await findCategory({ listId, name });
    if (existCategory) {
      res.status(status.BAD_REQUEST);
      throw new Error("Category already exist with same name");
    }
    const category = await createCategory({ listId, ...req.body });
    res.json(category);
  } catch (err: any) {
    next(err);
  }
}

export async function updateCategoryHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { categoryId } = req.params;
  const { name } = req.body;

  try {
    const category = await findCategoryById(categoryId);
    if (!category) {
      res.status(status.NOT_FOUND);
      throw new Error("Category does not exist");
    }
    const listId = category.listId;

    const categoryWithSameName = await findCategory({
      _id: { $ne: categoryId },
      listId,
      name,
    });
    if (categoryWithSameName) {
      res.status(status.BAD_REQUEST);
      throw new Error("Category already exist in list with the same name");
    }
    const updatedCategory = await updateCategory(categoryId, req.body);
    res.json(updatedCategory);
  } catch (err: any) {
    next(err);
  }
}

export async function deleteCategoryHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const deletedCategory = await deleteCategory(req.params.categoryId);
    if (!deletedCategory) {
      res.status(status.NOT_FOUND);
      throw new Error("Category does not exist.");
    }
    res.json(deletedCategory);
  } catch (err: any) {
    next(err);
  }
}
