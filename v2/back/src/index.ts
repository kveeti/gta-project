import mongoose from "mongoose";
import { createApp } from "./app";
import { mongoUri } from "./config/envs";

(async () => {
  await mongoose.connect(mongoUri);
  console.log("mongo connected");

  const app = createApp();

  app.listen(5000, () => {
    console.log(`Api listening on port 5000`);
  });
})();
