import { Router } from "express";
import { createGarage } from "../controllers/garages";
import { createGarageValidation } from "../middleware/validation/createGarage";

const router = Router();

router.post("/", createGarageValidation, createGarage);

export { router as garages };
