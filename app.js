import express from "express";
import session from "express-session";
import cors from "cors";
import helmet from "helmet";
import path from "path";

import { SESSION_OPTIONS } from "./config";
import { auth, cars, check, garages, search, epic } from "./routes";

import { active, loggedIn } from "./middleware";

export const createApp = (store) => {
  const app = express();

  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          ...helmet.contentSecurityPolicy.getDefaultDirectives(),
          "default-src": ["'self'", "accounts.google.com"],
          "script-src": ["'self'", "apis.google.com"],
        },
      },
    })
  );

  app.use(express.json());

  app.use(express.static(process.env.FRONT_ABS_PATH));

  app.set("trust proxy", "loopback");

  app.use(
    cors({
      origin: "https://ranut.net",
      credentials: true,
    })
  );

  app.use(session({ ...SESSION_OPTIONS, store }));

  app.use("/gta-api/check", check);

  app.use("/gta-api/auth", auth);

  app.use("/gta-api/cars", loggedIn, active, cars);

  app.use("/gta-api/garages", loggedIn, active, garages);

  app.use("/gta-api/search", loggedIn, active, search);

  app.use("/epic", epic);

  app.get("/*", (_, res) => {
    res.sendFile(path.join(process.env.FRONT_ABS_PATH, "index.html"));
  });

  return app;
};
