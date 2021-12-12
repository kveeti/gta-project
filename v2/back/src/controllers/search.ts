import { Request, Response } from "express";
import { db } from "../database";
import { Auth } from "../interfaces/Auth";
import { res200Json, res400 } from "../util/responseWith";

const emptyResponse = {
  cars: [],
  garages: [],
};

export const search = async (req: Request, res: Response) => {
  const query = req.query.q as string;
  const auth = req.auth as unknown as Auth;

  if (!query) return res400(res, "query was not provided");

  try {
    const garages = await db.garages.get.all(auth.dbId);
    const cars = await db.cars.get.all(auth.dbId);

    const matchingGarages = garages?.filter(
      (garage) => garage?.name.includes(query) || garage?.desc.includes(query)
    );

    const matchingCars = cars?.filter(
      (car) =>
        car?.name.includes(query) ||
        car?.garage.desc.includes(query) ||
        car?.garage.name.includes(query)
    );

    if (!matchingGarages && !matchingCars) return res200Json(res, emptyResponse);

    if (!matchingGarages && matchingCars)
      return res200Json(res, { cars: matchingCars, garages: [] });

    if (matchingGarages && !matchingCars)
      return res200Json(res, { cars: [], garages: matchingGarages });

    return res200Json(res, {
      cars: matchingCars,
      garages: matchingGarages,
    });
  } catch (err: any) {
    console.log(err);
  }
};
