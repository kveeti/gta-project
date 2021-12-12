import { Router } from "express";
import { createCar } from "../controllers/cars";
import { createCarValidation } from "../middleware/validation/createCar";

const router = Router();

router.post("/", createCarValidation, createCar);

export { router as cars };
