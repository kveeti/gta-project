import { Request, Response, NextFunction } from "express";
import { db } from "../../database";
import { Auth } from "../../interfaces/Auth";
import { res400, res500 } from "../../util/responseWith";

export const createGarageValidation = async (req: Request, res: Response, next: NextFunction) => {
  const auth = req.auth as unknown as Auth;
  const modelGarageId = req.body.modelGarageId;
  const desc = req.body.desc;

  if (!modelGarageId) return res400(res, "'modelGarageId' was not provided");
  if (desc === undefined) return res400(res, "'desc' was not provided");

  try {
    // check if model garage exists
    const modelGarage = await db.modelGarages.get.one(modelGarageId);

    if (!modelGarage) return res400(res, "'modelGarageId' was invalid");
    req.body.modelGarage = modelGarage;

    // check if user already has that garage
    const existingGarage = await db.garages.get.byModelGarageId(modelGarageId, auth.dbId);
    if (existingGarage) return res400(res, "garage exists");

    next();
  } catch (err: any) {
    console.log(err);
    res500(res, "db error");
  }
};
