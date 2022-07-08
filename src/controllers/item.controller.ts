import { Request, Response, NextFunction } from "express";
import {
  findItemsPagination,
  createItem,
  updateItem,
  deleteItem,
} from "../services/item.service";
import { findCategoryById } from "../services/category.service";
import {
  CreateItemSchema,
  FindItemSchema,
  UpdateItemSchema,
  DeleteItemSchema,
} from "../schema/item.schema";
import status from "http-status";

// @desc    Fetch all items by categoryId
// @route   GET /api/v1/item/category/:categoryId?page=""&items=""
// @access  Private
export async function getItemsHandler(
  req: Request<FindItemSchema["params"], {}, {}, FindItemSchema["query"]>,
  res: Response,
  next: NextFunction
) {
  try {
    const { categoryId } = req.params;

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.items) || 5;
    const skip = page * limit - limit;

    /** ##########################
     * 3 Ver si puedo hacer todo en una sola consulta
     *    count total + populate
     */

    const category = await findCategoryById(categoryId);
    if (!category) {
      res.status(status.BAD_REQUEST);
      throw new Error("Category does not exist");
    }

    // Total documents => items in array
    const count = category.items.length;

    // Total pages
    const pages = Math.ceil(count / limit);

    // Pagination Object
    const pagination = { page, pages, count };

    if (count === 0) {
      return res.status(status.NO_CONTENT).json({
        success: false,
        result: [],
        pagination,
        message: "Collection is Empty",
      });
    }

    const categoryPaginate = await findItemsPagination(categoryId, skip, limit);
    const items = categoryPaginate?.items;

    if (items && items.length > 0) {
      return res.json({
        success: true,
        result: items,
        pagination,
        message: "Successfully found all documents",
      });
    } else {
      return res.status(status.NO_CONTENT).json({
        success: false,
        result: [],
        pagination,
        message: "Pagination is Empty",
      });
    }
  } catch (err: any) {
    next(err);
  }
}

// @desc    Create item by category
// @route   POST /api/v1/item/category/:categoryId
// @access  Private
export async function createItemHandler(
  req: Request<CreateItemSchema["params"], {}, CreateItemSchema["body"]>,
  res: Response,
  next: NextFunction
) {
  try {
    const { categoryId } = req.params;

    // TODO: delete in a session block

    // Find category parent
    const category = await findCategoryById(categoryId);
    if (!category) {
      res.status(status.BAD_REQUEST);
      throw new Error("Category does not exist");
    }

    // Create item
    const newItem = await createItem(req.body);

    // Save item ref in category parent
    // TODO: Category push and save in service
    category.items.push(newItem._id);
    await category.save();

    return res.json({
      success: true,
      result: newItem,
      message: "Successfully Created the document in Model",
    });
  } catch (err: any) {
    next(err);
  }
}

// @desc    Update items by id
// @route   PUT /api/v1/item/:itemId
// @access  Private
export async function updateItemHandler(
  req: Request<UpdateItemSchema["params"], {}, UpdateItemSchema["body"]>,
  res: Response,
  next: NextFunction
) {
  try {
    const { itemId } = req.params;

    const updatedItem = await updateItem(itemId, req.body);
    if (!updatedItem) {
      res.status(status.BAD_REQUEST);
      throw new Error("Item does not exist");
    }

    return res.json({
      success: true,
      result: updatedItem,
      message: `Item ${itemId} was updated`,
    });
  } catch (err: any) {
    next(err);
  }
}

// @desc    Delete items by id
// @route   DELETE /api/v1/item/:itemId?categoryId=""
// @access  Private
export async function deleteItemHandler(
  req: Request<DeleteItemSchema["params"], {}, {}, DeleteItemSchema["query"]>,
  res: Response,
  next: NextFunction
) {
  try {
    const { itemId } = req.params;
    const { categoryId } = req.query;

    const deletedItem = await deleteItem(categoryId, itemId);
    if (!deletedItem) {
      res.status(status.BAD_REQUEST);
      throw new Error("The item could not be deleted");
    }
    return res.json({
      success: true,
      result: deletedItem,
      message: `Item ${itemId} was deleted`,
    });
  } catch (err: any) {
    next(err);
  }
}
