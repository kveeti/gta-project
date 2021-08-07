import express from "express";

import {
  searchGarage,
  getGarage,
  newGarage,
  rmGarage,
  renameGarage,
} from "../controllers/garageController";

const router = express.Router();

router.get("/", searchGarage);

router.get("/:garageID", getGarage);

router.post("/", newGarage);

router.patch("/:garageId", renameGarage);

router.delete("/:garageID", rmGarage);

export { router as garages };
