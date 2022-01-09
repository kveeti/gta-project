import { Request, Response, NextFunction } from "express";
import { db } from "../../db";
import { Auth } from "../../interfaces/Auth";
import { ErrorCar } from "../../interfaces/ErrorCars";
import { SimplifiedCar } from "../../interfaces/Simplified";
import { res400, res500 } from "../../util/responseWith";
import { simplifyCars, simplifyGarages } from "../../util/simplify";

export const moveCarValidation = async (req: Request, res: Response, next: NextFunction) => {
  const auth = res.locals.auth as Auth;
  const garageId = req.params.garageId;
  const carIds = req.body.carIds;

  if (!Array.isArray(carIds)) return res400(res, "'carIds' were invalid");
  if (!garageId) return res400(res, "'garageId' was not provided");

  const errorCars: ErrorCar[] = [];

  try {
    let ownedCars = simplifyCars(await db.cars.get.byIds(carIds, auth.dbId));

    ownedCars = ownedCars.filter((car: SimplifiedCar) => {
      if (!carIds.includes("" + car.id)) {
        errorCars.push({ ...car, reason: "not owned" });
        return false;
      }
      if ("" + car.garage.id === garageId) {
        errorCars.push({ ...car, reason: "already in target" });
        return false;
      }

      return true;
    });

    // check if the target garage exists and belongs to user
    const targetGarage = simplifyGarages([await db.garages.get.one(garageId, auth.dbId)])[0];
    if (!targetGarage) return res400(res, "'garageId' was invalid");

    // check garage's capacity
    if (targetGarage.room < ownedCars.length) return res400(res, "no room");

    res.locals.carsToMove = ownedCars;
    res.locals.targetGarage = targetGarage;
    res.locals.errorCars = errorCars;

    next();
  } catch (err: any) {
    console.log(err);
    res500(res, "db error");
  }
};
