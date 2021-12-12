import { Request, Response, NextFunction } from "express";
import { db } from "../../database";
import { Auth } from "../../interfaces/Auth";
import { res400, res500 } from "../../util/responseWith";

export const createCarValidation = async (req: Request, res: Response, next: NextFunction) => {
  const auth = req.auth as unknown as Auth;
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
    if (!garage) return res400(res, "'garageId' was invalid");

    // check garage's capacity
    const carsInGarage = await db.cars.get.byGarage(garageId, auth.dbId);
    if (carsInGarage && carsInGarage.length >= garage.modelGarage.capacity)
      return res400(res, `garage is full, max: ${garage.modelGarage.capacity}`);

    next();
  } catch (err: any) {
    console.log(err);
    res500(res, "db error");
  }
};
