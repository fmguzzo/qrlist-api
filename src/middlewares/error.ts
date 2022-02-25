import { ErrorRequestHandler, Request, Response, NextFunction } from "express";

const notFoundHandler = (req: Request, res: Response, next: NextFunction) => {
  const err = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(err);
};

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    success: false,
    result: [],
    message: err.message ? err.message : "Oops there is an Error",
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

export { notFoundHandler, errorHandler };
