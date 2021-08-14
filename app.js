import express from "express";
import session from "express-session";
import cors from "cors";
import helmet from "helmet";

import { SESSION_OPTIONS } from "./config";
import { auth, cars, check, garages, search } from "./routes";

import { active, loggedIn } from "./middleware";

export const createApp = (store) => {
  const app = express();

  app.use(helmet());

  app.use(express.json());

  app.set("trust proxy", "loopback");

  app.use(
    cors({
      origin: "http://localhost:3000",
      credentials: true,
    })
  );

  app.use(session({ ...SESSION_OPTIONS, store }));

  app.use("/gta-api/check", check);

  app.use("/gta-api/auth", auth);

  app.use("/gta-api/cars", loggedIn, active, cars);

  app.use("/gta-api/garages", loggedIn, active, garages);

  app.use("/gta-api/search", loggedIn, active, search);

  return app;
};
