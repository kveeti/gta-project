import express from "express";

import { login, logout } from "../controllers";

const router = express.Router();

router.post("/login", login);

router.delete("/logout", logout);

export { router as auth };
