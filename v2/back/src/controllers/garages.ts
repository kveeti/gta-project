import { Request, Response } from "express";
import { db } from "../db";
import { Auth } from "../interfaces/Auth";
import { res200Json, res500 } from "../util/responseWith";

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
