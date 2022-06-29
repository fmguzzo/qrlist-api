import { Request, Response, NextFunction } from "express";
import status from "http-status";

import {
  findList,
  findLists,
  createList,
  updateListById,
  deleteListById,
} from "../services/list.service";

import { findSiteByOwner } from "../services/site.service";

import { CreateListSchema, UpdateListSchema } from "../schema/list.schema";

export async function getAllListHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const lists = await findLists({ siteId: req.params.siteId });
    res.json(lists);
  } catch (err: any) {
    next(err);
  }
}

export async function createListHandler(
  req: Request<CreateListSchema["params"], {}, CreateListSchema["body"]>,
  res: Response,
  next: NextFunction
) {
  try {
    const { siteId } = req.params;
    const { body } = req;
    const existList = await findList({ siteId, name: body.name });
    if (existList) {
      res.status(status.BAD_REQUEST);
      throw new Error("List already exist with same name.");
    }
    const list = await createList({ ...body, siteId });
    res.json(list);
  } catch (err: any) {
    next(err);
  }
}

export async function getListHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const list = await findList({ _id: req.params.listId });
    if (!list) {
      res.status(status.NOT_FOUND);
      throw new Error("List does not exist.");
    }
    res.json(list);
  } catch (err: any) {
    next(err);
  }
}

export async function updateListHandler(
  req: Request<UpdateListSchema["params"], {}, UpdateListSchema["body"]>,
  res: Response,
  next: NextFunction
) {
  try {
    const listId = req.params.listId;
    const { body } = req;

    // TODO: Analyze siteId throw params
    const site = await findSiteByOwner(res.locals.user._id);

    const listWithSameName = await findList({
      _id: { $ne: listId },
      siteId: site._id,
      name: body.name,
    });
    if (listWithSameName) {
      res.status(status.NOT_FOUND);
      throw new Error("List name already exist");
    }
    const updatedList = await updateListById(listId, body);
    res.json(updatedList);
  } catch (err: any) {
    next(err);
  }
}

export async function deleteListHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const deletedList = await deleteListById(req.params.listId);
    if (!deletedList) {
      res.status(status.NOT_FOUND);
      throw new Error("List does not exist.");
    }
    res.json(deletedList);
  } catch (err: any) {
    next(err);
  }
}
