import { NextFunction, Request, Response } from "express";
import { res400 } from "../util/responseWith";

export const queryCleanUp = (req: Request, res: Response, next: NextFunction) => {
  const query = req.query.q;

  if (!query) return res400(res, "query was not provided");

  res.locals.q = query.toString().toLowerCase().trim();

  next();
};
