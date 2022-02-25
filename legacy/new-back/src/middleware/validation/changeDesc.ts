import { Request, Response, NextFunction } from "express";
import { db } from "../../db";
import { Auth } from "../../interfaces/Auth";
import { res404, res500 } from "../../util/responseWith";

export const changeDescValidation = async (req: Request, res: Response, next: NextFunction) => {
  const newDesc = req.body.desc;
  const auth = res.locals.auth as Auth;

  try {
    const garage = await db.garages.get.one(req.params.garageId, auth.dbId);
    if (!garage) return res404(res, "Garage not found");

    next();
  } catch (err: any) {
    console.log(err);
    res500(res, "db error");
  }
};
