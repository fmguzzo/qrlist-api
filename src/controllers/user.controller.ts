import { Request, Response, NextFunction } from "express";

import { CreateUserInput } from "../schema/user.schema";
import { createUser } from "../services/user.service";
import { omit } from "lodash";

import log from "../utils/logger";
import sendEmail from "../utils/mailer";

export async function createUserHandler(
  req: Request<{}, {}, CreateUserInput>,
  res: Response,
  next: NextFunction
) {
  const body = req.body;

  try {
    const user = await createUser(body);

    // await sendEmail({
    sendEmail({
      to: user.email,
      subject: "Verify your email",
      text: `verification code: ${user.verificationCode}. Id: ${user._id}`,
    });

    return res.send(omit(user.toJSON(), ["password", "verificationCode"]));
  } catch (err: any) {
    if (err.code === 11000) {
      //return res.status(409).send("Account already exists");
      res.status(409);
      return next(new Error("Account already exists"));
    }
    //return res.status(500).send(err);
    return next(err);
  }
}
