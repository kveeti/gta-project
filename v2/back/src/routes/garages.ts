import { Router } from "express";
import { moveCars } from "../controllers/cars";
import { changeDesc, createGarage, deleteGarage, getGarage } from "../controllers/garages";
import { changeDescValidation } from "../middleware/validation/changeDesc";
import { createGarageValidation } from "../middleware/validation/createGarage";
import { deleteGarageValidation } from "../middleware/validation/deleteGarage";
import { moveCarValidation } from "../middleware/validation/moveCar";

const router = Router();

router.post("/", createGarageValidation, createGarage);

router.patch("/:garageId", moveCarValidation, moveCars);
router.patch("/:garageId/desc", changeDescValidation, changeDesc);

router.get("/:garageId", getGarage);
router.delete("/:garageId", deleteGarageValidation, deleteGarage);

export { router as garages };
