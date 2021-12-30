import { Request, Response } from "express";
import { ObjectId } from "mongoose";
import { db } from "../db";
import { Auth } from "../interfaces/Auth";
import { SimplifiedCar } from "../interfaces/Simplified";
import { res200, res500 } from "../util/responseWith";

export const createCar = async (req: Request, res: Response) => {
  const modelCarId = req.body.modelCarId as ObjectId;
  const garageId = req.body.garageId;
  const auth = res.locals.auth as Auth;

  try {
    const newCar = await db.cars.create({
      modelCar: modelCarId,
      owner: auth.dbId,
      garage: garageId,
    });

    await db.user.cars.add(newCar._id, auth);
    await db.garages.cars.add(garageId, newCar._id, auth.dbId);
    res200(res);
  } catch (err: any) {
    console.log(err);
    res500(res, "db error");
  }
};

export const deleteCars = async (req: Request, res: Response) => {
  const cars = req.body as SimplifiedCar[];
  const auth = res.locals.auth as Auth;

  try {
    for (const car of cars) {
      await db.cars.remove(car.id, auth.dbId);
      await db.garages.cars.remove(car.garage.id, car.id, auth.dbId);
      await db.user.cars.remove(car.id, auth);
    }

    res200(res);
  } catch (err: any) {
    console.log(err);
    res500(res, "db error");
  }
};
