import { Request, Response } from "express";
import { ObjectId } from "mongoose";
import { db } from "../database";
import { Auth } from "../interfaces/Auth";
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
