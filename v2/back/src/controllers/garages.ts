import { Request, Response } from "express";
import { db } from "../database";
import { Auth } from "../interfaces/Auth";
import { ModelGarageDoc } from "../models/ModelGarage";
import { res200, res500 } from "../util/responseWith";

export const createGarage = async (req: Request, res: Response) => {
  const modelGarage = req.body.modelGarage as ModelGarageDoc;
  const desc = req.body.desc;
  const auth = res.locals.auth as Auth;

  const newGarage = {
    modelGarage: modelGarage._id,
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
