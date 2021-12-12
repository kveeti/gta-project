import { Request, Response } from "express";
import { db } from "../database";
import { res400 } from "../util/responseWith";

export const search = async (req: Request, res: Response) => {
  const query = req.body.query;
  const auth = req.auth;

  if (!query) return res400(res, "query was not provided");

  try {
    const res = await Promise.all([db.cars.get.all(auth.userId), db.garages.get.all(auth.userId)]);

    console.log(res);
  } catch (err: any) {}
};
