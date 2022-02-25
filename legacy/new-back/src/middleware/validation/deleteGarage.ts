import { Request, Response, NextFunction } from "express";
import { db } from "../../db";
import { Auth } from "../../interfaces/Auth";
import { res404, res500 } from "../../util/responseWith";

export const deleteGarageValidation = async (req: Request, res: Response, next: NextFunction) => {
  const auth = res.locals.auth as Auth;
  const garageId = req.params.garageId;

  try {
    const garage = await db.garages.get.one(garageId, auth.dbId);

    if (!garage) return res404(res, "Garage not found");

    next();
  } catch (err: any) {
    console.log(err);
    res500(res, "db error");
  }
};
