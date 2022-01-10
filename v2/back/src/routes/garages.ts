import { Router } from "express";
import { moveCars } from "../controllers/cars";
import { createGarage, getGarage } from "../controllers/garages";
import { createGarageValidation } from "../middleware/validation/createGarage";
import { moveCarValidation } from "../middleware/validation/moveCar";

const router = Router();

router.post("/", createGarageValidation, createGarage);
router.patch("/:garageId", moveCarValidation, moveCars);
router.get("/:garageId", getGarage);

export { router as garages };
