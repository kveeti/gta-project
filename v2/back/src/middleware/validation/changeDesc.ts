import { Request, Response, NextFunction } from "express";
import { db } from "../../db";
import { Auth } from "../../interfaces/Auth";
import { res400, res401, res500 } from "../../util/responseWith";

export const changeDescValidation = async (req: Request, res: Response, next: NextFunction) => {
  const newDesc = req.body.desc;
  const auth = res.locals.auth as Auth;

  if (!newDesc) return res400(res, "invalid desc");

  try {
    const garage = await db.garages.get.one(req.params.garageId, auth.dbId);
    if (!garage) return res401(res, "You don't own this garage");

    next();
  } catch (err: any) {
    console.log(err);
    res500(res, "db error");
  }
};
