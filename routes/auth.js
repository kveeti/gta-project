import express from "express";
const router = express.Router();

import { login, logout, checkLogin } from "../controllers/authController";

import { loggedIn, active } from "../middleware";

router.get("/check", loggedIn, active, checkLogin);

router.post("/login", login);

router.delete("/logout", logout);

export { router as auth };
