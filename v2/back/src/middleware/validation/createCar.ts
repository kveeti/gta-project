import { Request, Response, NextFunction } from "express";
import { db } from "../../db";
import { Auth } from "../../interfaces/Auth";
import { res400, res500 } from "../../util/responseWith";
import { simplifyGarages } from "../../util/simplify";

export const createCarValidation = async (req: Request, res: Response, next: NextFunction) => {
  const auth = res.locals.auth as Auth;
  const garageId = req.body.garageId;
  const modelCarId = req.body.modelCarId;

  if (!modelCarId) return res400(res, "'carId' was not provided");
  if (!garageId) return res400(res, "'garageId' was not provided");

  try {
    // check if model car exists
    const modelCar = await db.modelCars.get.one(modelCarId);
    if (!modelCar) return res400(res, "'modelCarId' was invalid");
    req.body.modelCar = modelCar;

    // check if garage exists and belongs to user
    const garage = await db.garages.get.one(garageId, auth.dbId);
    if (!garage) return res400(res, "You don't own this garage");
    const simplifiedGarage = simplifyGarages([garage])[0];

    if (!simplifiedGarage) return res400(res, "You don't own this garage");

    // check garage's capacity
    if (simplifiedGarage.room < 1) return res400(res, "There isn't enough room in the garage");

    next();
  } catch (err: any) {
    console.log(err);
    res500(res, "db error");
  }
};
