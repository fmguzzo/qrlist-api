import { FilterQuery, UpdateQuery } from "mongoose";
import CategoryModel, { CategoryDocument } from "../models/category.model";

export async function findCategories(filter: FilterQuery<CategoryDocument>) {
  return CategoryModel.find(filter);
}

export async function findCategory(filter: FilterQuery<CategoryDocument>) {
  return CategoryModel.findOne(filter);
}

export async function findCategoryById(categoryId: CategoryDocument["_id"]) {
  return CategoryModel.findById(categoryId);
}

export async function createCategory(category: CategoryDocument) {
  return CategoryModel.create(category);
}

export async function deleteCategory(categoryId: CategoryDocument["_id"]) {
  return CategoryModel.findByIdAndDelete(categoryId);
}

export async function updateCategory(
  categoryId: CategoryDocument["_id"],
  update: UpdateQuery<CategoryDocument>
) {
  return CategoryModel.findByIdAndUpdate(categoryId, update, { new: true });
}
