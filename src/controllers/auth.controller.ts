import { Request, Response, NextFunction } from "express";
import { CreateSessionInput } from "../schema/auth.schema";
import {
  signAccessToken,
  signRefreshToken,
  findSessionById,
  findSessions,
} from "../services/auth.service";
import { findUserByEmail, findUserById } from "../services/user.service";
import { get } from "lodash";
import { verifyJwt } from "../utils/jwt";

export async function createSessionHandler(
  req: Request<{}, {}, CreateSessionInput>,
  res: Response,
  next: NextFunction
) {
  const message = "Invalid email or password";

  try {
    const { email, password } = req.body;
    const user = await findUserByEmail(email);

    if (!user) {
      res.status(401);
      throw new Error(message);
    }

    if (!user.verified) {
      res.status(403);
      throw new Error("Please verify your email");
    }

    const isValid = await user.comparePassword(password);
    if (!isValid) {
      res.status(401);
      throw new Error(message);
    }

    // sign a access token
    const accessToken = signAccessToken(user);

    // sign a refresh token
    const refreshToken = await signRefreshToken({
      userId: user._id,
      userAgent: req.get("user-agent") || "",
    });

    // send the tokens

    return res.send({
      accessToken,
      refreshToken,
    });
  } catch (error) {
    next(error);
  }
}

export async function refreshAccessTokenHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const refreshToken = get(req, "headers.x-refresh");

    const decoded = verifyJwt<{ session: string }>(
      refreshToken,
      "refreshTokenPublicKey"
    );

    if (!decoded) {
      res.status(401);
      throw new Error("Could not refresh access token");
    }

    const session = await findSessionById(decoded.session);

    if (!session || !session.valid) {
      res.status(401);
      throw new Error("Could not refresh access token");
    }

    const user = await findUserById(String(session.user));

    if (!user) {
      res.status(401);
      throw new Error("Could not refresh access token");
    }

    const accessToken = signAccessToken(user);

    return res.send({ accessToken });
  } catch (error) {
    next(error);
  }
}

export async function getUserSessionsHandler(req: Request, res: Response) {
  const userId = res.locals.user._id;

  const sessions = await findSessions({ user: userId, valid: true });

  return res.send(sessions);
}

export async function deleteSessionHandler(req: Request, res: Response) {
  // TODO: Inplement logout / ver API producto, el desarialize, manejo del refresh
  // y ver que en el jwt payload almacena la session tbn.
  /*
  const sessionId = res.locals.user.session;

  await updateSession({ _id: sessionId }, { valid: false });

  return res.send({
    accessToken: null,
    refreshToken: null,
  });
  */
}
