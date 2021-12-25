import { Request, Response } from "express";
import { ObjectId } from "mongoose";
import { db } from "../database";
import { Auth } from "../interfaces/Auth";
import { SimplifiedCar } from "../interfaces/Simplified";
import { res200, res500 } from "../util/responseWith";

export const createCar = async (req: Request, res: Response) => {
  const modelCarId = req.body.modelCarId as ObjectId;
  const garageId = req.body.garageId;
  const auth = res.locals.auth as Auth;

  const newCar = {
    modelCar: modelCarId,
    owner: auth.dbId,
    garage: garageId,
  };

  try {
    const newCarId = await db.cars.create(newCar);
    await db.users.add.car(newCarId, auth);
    await db.garages.cars.add(garageId, newCarId, auth.dbId);
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
      await db.users.remove.car(car.id, auth);
    }

    res200(res);
  } catch (err: any) {
    console.log(err);
    res500(res, "db error");
  }
};
