import { Request, Response } from "express";
import { db } from "../db";
import { Auth } from "../interfaces/Auth";
import { res200Json, res204, res400, res404, res500 } from "../util/responseWith";
import { simplifyGaragesDeep } from "../util/simplify";

export const createGarage = async (req: Request, res: Response) => {
  const modelGarageId = req.body.modelGarageId;
  const desc = req.body.desc;
  const auth = res.locals.auth as Auth;

  try {
    const newGarage = await db.garages.create({
      modelGarage: modelGarageId,
      desc,
      owner: auth.dbId,
      cars: [],
    });

    await db.user.garages.add(newGarage._id, auth);
    res200Json(res, newGarage);
  } catch (err: any) {
    console.log(err);
    res500(res, "db error");
  }
};

export const getGarage = async (req: Request, res: Response) => {
  const auth = res.locals.auth as Auth;
  const garageId = req.params.garageId;

  if (!garageId) return res400(res, "invalid garageId");

  try {
    const garage = simplifyGaragesDeep([await db.garages.get.one(garageId, auth.dbId)])[0];

    res200Json(res, garage);
  } catch (err: any) {
    console.log(err);
    res500(res, "db error");
  }
};

export const changeDesc = async (req: Request, res: Response) => {
  const newDesc = req.body.desc;
  const garageId = req.params.garageId;
  const auth = res.locals.auth as Auth;

  try {
    const updated = await db.garages.set.desc(garageId, auth.dbId, newDesc);

    res200Json(res, updated);
  } catch (err) {
    console.log(err);
    res500(res, "db error");
  }
};

export const deleteGarage = async (req: Request, res: Response) => {
  const auth = res.locals.auth as Auth;
  const garageId = req.params.garageId;

  try {
    const garage = await db.garages.remove(garageId, auth.dbId);
    if (!garage) return res404(res, "Garage not found");

    // delete all cars that were in deleted garage
    await db.cars.removeMany(garage.cars, auth.dbId);

    // delete the garage from user document
    await db.user.garages.remove(garage._id, auth);

    // delete all the cars from user document
    await db.user.cars.removeMany(garage.cars, auth);

    res204(res);
  } catch (err) {
    console.log(err);
    res500(res, "db error");
  }
};
