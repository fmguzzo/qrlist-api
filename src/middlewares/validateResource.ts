import { Request, Response, NextFunction } from "express";
import { AnyZodObject, ZodError } from "zod";

const validateResource =
  (schema: AnyZodObject) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      return next();
    } catch (error) {
      if (error instanceof ZodError) {
        const allErrors = error.issues
          .map((errMsg) => errMsg.message)
          .join(", ");
        //res.status(400).send(allErrors);
        res.status(400);
        return next(new Error(allErrors));
      }
      return next(error);
    }
  };

export default validateResource;
