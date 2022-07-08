import { UpdateQuery } from "mongoose";
import ItemModel, { ItemField } from "../models/item.model";
import CategoryModel from "../models/category.model";

export async function findItems(categoryId: string) {
  return CategoryModel.findById(categoryId).populate("items");
}

export async function findItemById(itemId: string) {
  return ItemModel.findById(itemId);
}

export async function updateItem(
  itemId: string,
  update: UpdateQuery<ItemField>
) {
  return ItemModel.findByIdAndUpdate(itemId, update, { new: true });
}

export async function deleteItem(categoryId: string, itemId: string) {
  // TODO: Test delete middleware in item schema
  // TODO: delete in a session block
  try {
    const deletedItem = await ItemModel.findByIdAndDelete(itemId);
    if (deletedItem) {
      const updatedCategory = await CategoryModel.findByIdAndUpdate(
        categoryId,
        { $pull: { items: itemId } },
        { new: true }
      );
      if (!updatedCategory) {
        throw new Error("Item can't be deleted from category array");
      }
    }
    return deletedItem;
  } catch (err) {
    return Promise.reject(err);
  }
}

export async function findItemsPagination(
  categoryId: string,
  skip: number,
  limit: number
) {
  return CategoryModel.findById(categoryId).populate([
    {
      path: "items",
      select: "name desc price",
      options: {
        sort: {},
        skip: skip,
        limit: limit,
      },
    },
  ]);
}

export async function createItem(item: ItemField) {
  return ItemModel.create(item);
}
