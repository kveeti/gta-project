import { Request, Response } from "express";
import { db } from "../db";
import { Auth } from "../interfaces/Auth";
import { res200, res500 } from "../util/responseWith";

export const createGarage = async (req: Request, res: Response) => {
  const modelGarageId = req.body.modelGarageId;
  const desc = req.body.desc;
  const auth = res.locals.auth as Auth;

  const newGarage = {
    modelGarage: modelGarageId,
    desc,
    owner: auth.dbId,
    cars: [],
  };

  try {
    const newGarageId = await db.garages.create(newGarage);
    await db.users.add.garage(newGarageId, auth);
    res200(res);
  } catch (err: any) {
    console.log(err);
    res500(res, "db error");
  }
};
