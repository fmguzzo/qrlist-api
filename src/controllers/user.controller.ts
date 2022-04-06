import { Request, Response, NextFunction } from "express";

import {
  CreateUserInput,
  VerifyUserInput,
  ForgotPasswordInput,
  ResetPasswordInput,
} from "../schema/user.schema";
import {
  createUser,
  findUserById,
  findUserByEmail,
} from "../services/user.service";
import { omit } from "lodash";
import { nanoid } from "nanoid";

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
      return res.send(
        omit(user.toJSON(), [
          "password",
          "verificationCode",
          "passwordResetCode",
        ])
      );
    }
    res.status(400);
    throw new Error("Could not verify user.");
  } catch (err: any) {
    next(err);
  }
}

export async function forgotPasswordHandler(
  req: Request<{}, {}, ForgotPasswordInput>,
  res: Response,
  next: NextFunction
) {
  try {
    const { email } = req.body;
    const user = await findUserByEmail(email);
    const message =
      "If a user with that email is registered you will receive a password reset email";

    if (!user) {
      log.debug(`User with email ${email} does not exists`);
      return res.send(message);
    }

    if (!user.verified) {
      res.status(400);
      throw new Error("User is not verified.");
    }

    user.passwordResetCode = nanoid();
    await user.save();

    sendEmail({
      to: user.email,
      from: "test@example.com",
      subject: "Reset your password",
      text: `Password reset code: ${user.passwordResetCode}. Id ${user._id}`,
    });

    log.debug(`Password reset email sent to ${email}`);

    return res.send(message);
  } catch (err) {
    next(err);
  }
}

export async function resetPasswordHandler(
  req: Request<ResetPasswordInput["params"], {}, ResetPasswordInput["body"]>,
  res: Response,
  next: NextFunction
) {
  try {
    const { id, passwordResetCode } = req.params;
    const { password } = req.body;

    const user = await findUserById(id);

    if (
      !user ||
      !user.passwordResetCode ||
      user.passwordResetCode !== passwordResetCode
    ) {
      res.status(400);
      throw new Error("Could not reset user password");
    }

    user.passwordResetCode = null;
    user.password = password;
    await user.save();

    res.send(
      omit(user.toJSON(), ["password", "verificationCode", "passwordResetCode"])
    );
  } catch (err) {
    next(err);
  }
}
