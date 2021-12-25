import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

import { jwtSecret } from "../config/envs";
import { db } from "../db";
import { res401, res500 } from "../util/responseWith";

export const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.headers) return res401(res, "no auth");
  if (!req.headers.authorization) return res401(res, "no auth");

  const auth = req.headers.authorization.split(" ");

  if (auth.length < 2) return res401(res, "bad auth");
  if (auth[0] !== "Bearer") return res401(res, "bad auth");

  const token = auth[1];

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
    user = await db.users.upsert(decoded.sub as string, (decoded as any).email);
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
