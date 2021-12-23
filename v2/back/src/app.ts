import express from "express";
import helmet from "helmet";
import cors from "cors";
import { corsOrigins } from "./config/envs";
import { search, cars, garages } from "./routes/";
import { verifyToken } from "./middleware/auth";
import { users } from "./routes/users";

export const createApp = () => {
  const app = express();

  app.use(express.json());
  app.use(helmet());
  app.set("trust proxy", "loopback");
  app.use(cors({ origin: corsOrigins }));

  app.use(verifyToken);

  app.use("/gta-api/search", search);
  app.use("/gta-api/cars", cars);
  app.use("/gta-api/garages", garages);
  app.use("/gta-api/users", users);

  return app;
};
