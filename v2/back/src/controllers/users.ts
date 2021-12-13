import { Request, Response } from "express";
import { db } from "../database";
import { res200Json, res500 } from "../util/responseWith";
import { simplifyUser } from "../util/simplify";

export const getUser = async (req: Request, res: Response) => {
  const userId = req.auth.userId;
  const email = req.auth.email;

  try {
    const user = await db.users.get(userId, email);

    res200Json(res, simplifyUser(user));
  } catch (err: any) {
    res500(res, "db error");
  }
};
