import { Router } from "express";
import { search } from "../controllers/search";
import { queryCleanUp } from "../middleware/queryCleanUp";

const router = Router();

router.use(queryCleanUp);

router.get("/garages", search.owned.garages);
router.get("/modelgarages", search.modelGarages);
router.get("/modelcars", search.modelCars);
router.get("/", search.owned.all);

export { router as search };
