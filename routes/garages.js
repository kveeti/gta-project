import express from "express";

import {
  searchGarage,
  getGarage,
  newGarage,
  rmGarage,
  renameGarage,
} from "../controllers/garage";

const router = express.Router();

router.get("/", searchGarage);

router.get("/:garageId", getGarage);

router.post("/", newGarage);

router.patch("/:garageId", renameGarage);

router.delete("/:garageId", rmGarage);

export { router as garages };
