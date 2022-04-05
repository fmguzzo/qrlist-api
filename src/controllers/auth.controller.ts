import { Request, Response, NextFunction } from "express";
import { createSession } from "../services/session.service";

export async function createSessionHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { user, isAdmin } = req.body;
  try {
    const session = await createSession(user, isAdmin);
    res.send(session);
  } catch (error) {
    console.error(error);
    next(error);
  }
}
