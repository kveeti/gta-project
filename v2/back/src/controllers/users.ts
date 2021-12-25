import { Request, Response } from "express";
import { db } from "../db";
import { Auth } from "../interfaces/Auth";
import { res200Json, res500 } from "../util/responseWith";
import { simplifyUser } from "../util/simplify";

export const getUser = async (req: Request, res: Response) => {
  const auth = res.locals.auth as Auth;

  try {
    const user = await db.users.get(auth.userId, auth.email);

    res200Json(res, simplifyUser(user));
  } catch (err: any) {
    res500(res, "db error");
  }
};
