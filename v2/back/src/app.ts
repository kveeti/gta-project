import express from "express";
import helmet from "helmet";
import cors from "cors";
import { corsOrigins } from "./config/envs";
import { search } from "./routes/";

export const createApp = () => {
  const app = express();

  app.use(express.json());
  app.use(helmet());
  app.set("trust proxy", "loopback");
  app.use(cors({ origin: corsOrigins }));

  app.use("/search", search);

  return app;
};
