import express from "express";

import { login, logout, checkLogin } from "../controllers/authController";

import { loggedIn, active } from "../middleware";

const router = express.Router();

router.get("/check", loggedIn, active, checkLogin);

router.post("/login", login);

router.delete("/logout", logout);

export { router as auth };
