import { Request, Response } from "express";
import { db } from "../db";
import { Auth } from "../interfaces/Auth";
import { res200Json, res400, res500 } from "../util/responseWith";
import {
  simplifyCars,
  simplifyGarages,
  simplifyModelCars,
  simplifyModelGarages,
} from "../util/simplify";

const emptyResponse = {
  cars: [],
  garages: [],
};

export const search = {
  owned: {
    garages: async (req: Request, res: Response) => {
      const query = res.locals.q;
      const auth = res.locals.auth as Auth;

      try {
        const garages = simplifyGarages(await db.garages.get.all(auth.dbId));

        if (!garages) return res200Json(res, { garages: [] });

        let matchingGarages = garages.filter(
          (garage) =>
            garage.name.toLowerCase().includes(query) || garage.desc.toLowerCase().includes(query)
        );

        if (matchingGarages.length > 5) matchingGarages = matchingGarages.slice(0, 5);

        return res200Json(res, { garages: matchingGarages });
      } catch (err: any) {
        console.log(err);
        res500(res, "db error");
      }
    },

    all: async (req: Request, res: Response) => {
      const query = res.locals.q;
      const auth = res.locals.auth as Auth;

      try {
        const garages = simplifyGarages(await db.garages.get.all(auth.dbId));
        const cars = simplifyCars(await db.cars.get.all(auth.dbId));

        let matchingGarages = garages.filter(
          (garage) => garage.name.includes(query) || garage.desc.includes(query)
        );

        let matchingCars = cars.filter(
          (car) =>
            car.name.includes(query) ||
            car.garage.desc.includes(query) ||
            car.garage.name.includes(query)
        );

        if (matchingGarages.length > 5) matchingGarages = matchingGarages.slice(0, 5);
        if (matchingCars.length > 21) matchingCars = matchingCars.slice(0, 21);

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
        res500(res, "error");
      }
    },
  },

  modelCars: async (req: Request, res: Response) => {
    const query = res.locals.q;

    if (!query) return res400(res, "query was not provided");

    try {
      const cars = simplifyModelCars(await db.modelCars.get.all());

      let matchingCars = cars.filter(
        (car) => car.name?.includes(query) || car.manufacturer?.includes(query)
      );

      if (matchingCars.length > 5) matchingCars = matchingCars.slice(0, 5);

      return res200Json(res, { modelCars: matchingCars });
    } catch (err: any) {
      console.log(err);
      res500(res, "db error");
    }
  },

  modelGarages: async (req: Request, res: Response) => {
    const query = res.locals.q;
    const auth = res.locals.auth as Auth;

    try {
      const garages = simplifyModelGarages(
        await db.modelGarages.get.all(),
        await db.garages.get.all(auth.dbId)
      );

      let matchingGarages = garages.filter((garage) => garage.name.includes(query));

      if (matchingGarages.length > 5) matchingGarages = matchingGarages.slice(0, 5);

      return res200Json(res, { modelGarages: matchingGarages });
    } catch (err: any) {
      console.log(err);
      res500(res, "db error");
    }
  },
};
