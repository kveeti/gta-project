import express from "express";

import { loggedIn, active } from "../middleware";

import { checkLogin, ping } from "../controllers";

const router = express.Router();

router.get("/login", loggedIn, active, checkLogin);

router.get("/ping", ping);

export { router as check };
