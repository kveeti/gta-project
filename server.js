import dotenv from "dotenv";
import mongoose from "mongoose";
import MongoStore from "connect-mongo";

import { MONGO_URI, MONGO_OPTIONS } from "./config";

import { createApp } from "./app";

(async () => {
  dotenv.config();

  await mongoose.connect(MONGO_URI, MONGO_OPTIONS);

  const store = MongoStore.create({
    mongoUrl: MONGO_URI,
  });

  const app = createApp(store);

  app.listen(4000, () => {
    console.log("dev api listening on port 4000");
    console.log(`mongo connected to ${process.env.MONGO_DATABASE}`);
  });
})();
