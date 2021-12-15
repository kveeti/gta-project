import { Request, Response } from "express";
import { db } from "../database";
import { Auth } from "../interfaces/Auth";
import { res200Json, res400, res500 } from "../util/responseWith";
import { simplifyCars, simplifyGarages, simplifyModelCar } from "../util/simplify";

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

        const matchingGarages = garages.filter(
          (garage) =>
            garage?.name.toLowerCase().includes(query) || garage?.desc.toLowerCase().includes(query)
        );

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
        res500(res, "error");
      }
    },
  },

  modelCars: async (req: Request, res: Response) => {
    const query = res.locals.q;

    if (!query) return res400(res, "query was not provided");

    try {
      const cars = simplifyModelCar(await db.modelCars.get.all());

      let matchingCars = cars.filter(
        (car) => car.name.includes(query) || car.manufacturer?.includes(query)
      );

      if (matchingCars.length > 3) matchingCars = matchingCars.slice(0, 3);

      return res200Json(res, { modelCars: matchingCars });
    } catch (err: any) {
      console.log(err);
      res500(res, "db error");
    }
  },

  modelGarages: async (req: Request, res: Response) => {
    const query = res.locals.q;

    try {
      const cars = await db.modelGarages.get.all();

      const matchingGarages = cars?.filter((garage) => garage?.name.includes(query));

      return res200Json(res, { modelGarages: matchingGarages });
    } catch (err: any) {
      console.log(err);
      res500(res, "db error");
    }
  },
};
