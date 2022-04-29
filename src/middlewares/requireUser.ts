import { Request, Response, NextFunction } from "express";

const requireUser = (req: Request, res: Response, next: NextFunction) => {
  const user = res.locals.user;

  if (!user) {
    //return res.sendStatus(403);
    res.status(403);
    return next(new Error("User have not access to resources requested"));
  }

  return next();
};

export default requireUser;
