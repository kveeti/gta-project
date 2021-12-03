import { carModel } from "../models";

export const checkLogin = async (req, res) => {
  res.status(201).json({ message: "OK" });
};

export const ping = async (req, res) => {
  const cars = await carModel.find();

  if (!cars) {
    return res.status(500).json({ message: "DOWN" });
  }

  res.status(200).json({ message: "UP" });
};
