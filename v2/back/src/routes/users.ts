import { Router } from "express";
import { getUser } from "../controllers/users";

const router = Router();

router.get("/", getUser);

export { router as users };
