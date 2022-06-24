import { FilterQuery, UpdateQuery } from "mongoose";
import SiteModel, { SiteDocument } from "../models/site.model";

export async function findSiteByOwner(ownerId: string) {
  let site = await SiteModel.findOne({ owner: ownerId });
  if (!site) {
    site = await SiteModel.create({ owner: ownerId });
  }
  return site;
}

export async function updateSiteByOwner(
  query: FilterQuery<SiteDocument>,
  update: UpdateQuery<SiteDocument>
) {
  return SiteModel.findOneAndUpdate(query, update, { new: true });
}
