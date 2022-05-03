import { Request, Response, NextFunction } from "express";
import { verifyJwt } from "../utils/jwt";
import { get } from "lodash";

// Simple deserializeUser
/*
const deserializeUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const accessToken = (req.headers.authorization || "").replace(
    /^Bearer\s/,
    ""
  );

  if (!accessToken) {
    return next();
  }

  const decoded = verifyJwt(accessToken, "accessTokenPublicKey");

  if (decoded) {
    res.locals.user = decoded;
  }

  return next();
};
*/

// desrializer with automatics refresh access token when it's expired
const deserializeUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const accessToken = (req.headers.authorization || "").replace(
    /^Bearer\s/,
    ""
  );

  const refreshToken = get(req, "headers.x-refresh");

  if (!accessToken) {
    return next();
  }

  const { decoded, expired } = verifyJwt(accessToken, "accessTokenPublicKey");

  if (decoded) {
    res.locals.user = decoded;
    return next();
  }

  /*********************************************************************
   * https://github.com/TomDoesTech/REST-API-Tutorial-Updated
   * Por el momento no implementamos el refresh automatico, que
   * se propone en el ejemplo anterior reIssueAccessToken()
   * Para regenerar el access token expirado se hace por medio de la ruta
   * que llama al controller refreshAccessTokenHandler()
   * - No creo que se implementen ambas estrategias al mismo tiempo
   * - Refresh por solicitud a endpoint y refresh automatico
   * *******************************************************************/

  // if (expired && refreshToken) {
  //   const newAccessToken = await reIssueAccessToken({ refreshToken });

  //   if (newAccessToken) {
  //     res.setHeader("x-access-token", newAccessToken);
  //   }

  //   const result = verifyJwt(newAccessToken as string, "accessTokenPublicKey");

  //   res.locals.user = result.decoded;
  //   return next();
  // }

  return next();
};

export default deserializeUser;
