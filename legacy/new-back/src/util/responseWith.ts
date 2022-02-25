import { Response } from "express";

export const res200 = async (res: Response) => {
  res.status(200).send("OK");
  res.locals.sentInfo = "OK";
};

export const res204 = async (res: Response) => {
  res.status(204).send();
  res.locals.sentInfo = "No content";
};

export const res200Json = async (res: Response, json: any) => {
  res.status(200).json(json);
  res.locals.sentInfo = "json";
};

export const res404 = async (res: Response, error: string) => {
  res.status(404).json({ error });
  res.locals.sentInfo = error;
};

export const res500 = async (res: Response, error: string) => {
  res.status(500).json({ error });
  res.locals.sentInfo = error;
};

export const res403 = async (res: Response, error: any) => {
  res.status(403).json({ error });
  res.locals.sentInfo = error;
};

export const res401 = async (res: Response, error: any) => {
  res.status(401).json({ error });
  res.locals.sentInfo = error;
};

export const res400 = async (res: Response, error: string) => {
  res.status(400).json({ error });
  res.locals.sentInfo = error;
};

export const res409 = async (res: Response, error: string) => {
  res.status(409).json({ error });
  res.locals.sentInfo = error;
};
