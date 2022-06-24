import { Request, Response, NextFunction } from "express";
import { FieldSiteSchema } from "../schema/site.schema";
import { findSiteByOwner, updateSiteByOwner } from "../services/site.service";

export async function getSiteHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const site = await findSiteByOwner(res.locals.user._id);
    if (!site) {
      res.status(400);
      throw new Error("Site can not be created.");
    }
    return res.status(200).json(site);
  } catch (err: any) {
    next(err);
  }
}

export async function updateSiteHandler(
  req: Request<{}, {}, FieldSiteSchema>,
  res: Response,
  next: NextFunction
) {
  try {
    const updatedSite = await updateSiteByOwner(
      { owner: res.locals.user._id },
      req.body
    );
    if (!updatedSite) {
      res.status(400);
      throw new Error("Can not modify Site.");
    }
    return res.json(updatedSite);
  } catch (err: any) {
    next(err);
  }
}
