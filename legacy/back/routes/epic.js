import express from "express";
import { epic } from "../controllers/";

const router = express.Router();

router.get("/:game", epic);

export { router as epic };
