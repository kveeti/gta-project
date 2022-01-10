import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

import { jwtSecret } from "../config/envs";
import { db } from "../db";
import { res401, res500 } from "../util/responseWith";

export const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.cookies) return res401(res, "no auth");
  if (!req.cookies["__Secure-next-auth.session-token"]) return res401(res, "no auth");

  const token = req.cookies["__Secure-next-auth.session-token"];

  let decoded = null;

  try {
    decoded = jwt.verify(token, jwtSecret);
  } catch (err: any) {
    return res401(res, "invalid token");
  }

  if (!decoded) return res500(res, "server error");

  if (!decoded.sub) return res401(res, "invalid token");
  if (!(decoded as any).email) return res401(res, "invalid token");

  let user;

  try {
    user = await db.user.upsert(decoded.sub as string, (decoded as any).email);
  } catch (err) {
    console.log(err);
    return res500(res, "server error");
  }

  res.locals.auth = {
    dbId: user._id,
    userId: decoded.sub as string,
    email: (decoded as any).email,
  };

  next();
};
