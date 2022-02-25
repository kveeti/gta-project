import express from "express";

import { search } from "../controllers";

const router = express.Router();

router.get("/", search);

export { router as search };
