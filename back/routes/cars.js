import express from "express";
const router = express.Router();

import {
  newCar,
  rmCar,
  moveCar,
  searchCar,
  possibleCars,
} from "../controllers/car";

router.get("/", searchCar);

router.get("/possible", possibleCars);

router.put("/", moveCar);

router.post("/", newCar);

router.delete("/:car_id", rmCar);

export { router as cars };
