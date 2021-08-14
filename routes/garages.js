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

router.get("/:garage_id", getGarage);

router.post("/", newGarage);

router.patch("/:garage_id", renameGarage);

router.delete("/:garage_id", rmGarage);

export { router as garages };
