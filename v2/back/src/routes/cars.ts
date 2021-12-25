import { Router } from "express";
import { createCar, deleteCars } from "../controllers/cars";
import { createCarValidation } from "../middleware/validation/createCar";

const router = Router();

router.post("/", createCarValidation, createCar);
router.delete("/", deleteCars);

export { router as cars };
