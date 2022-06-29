import { FilterQuery, UpdateQuery } from "mongoose";
import ListModel, { ListDocument, ListField } from "../models/list.model";

export async function findLists(filter: FilterQuery<ListDocument>) {
  return ListModel.find(filter);
}

export async function findList(filter: FilterQuery<ListDocument>) {
  return ListModel.findOne(filter);
}

export async function updateListById(
  listId: ListField["siteId"],
  update: UpdateQuery<ListDocument>
) {
  return ListModel.findByIdAndUpdate(listId, update, { new: true });
}

export async function deleteListById(listId: ListField["siteId"]) {
  return ListModel.findByIdAndDelete(listId);
}

export async function createList(list: ListField) {
  return ListModel.create(list);
}
