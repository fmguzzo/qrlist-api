import { Request, Response, NextFunction } from "express";

import { CreateUserInput, VerifyUserInput } from "../schema/user.schema";
import { createUser, findUserById } from "../services/user.service";
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

// TODO: type parameter
export async function verifyUserHandler(
  req: Request<VerifyUserInput>,
  res: Response,
  next: NextFunction
) {
  const id = req.params.id;
  const verificationCode = req.params.verificationCode;

  try {
    // find user by id
    const user = await findUserById(id);

    if (!user) {
      res.status(404);
      throw new Error("Could not verify user. User does not exit.");
    }

    // check to see if they are already verified
    if (user.verified) {
      res.status(400);
      throw new Error("User is already verified.");
    }

    // check to see if the verificationCode matches
    if (user.verificationCode === verificationCode) {
      user.verified = true;
      await user.save();
      return res.send(omit(user.toJSON(), ["password", "verificationCode"]));
    }
    res.status(400);
    throw new Error("Could not verify user.");
  } catch (err: any) {
    next(err);
  }
}
