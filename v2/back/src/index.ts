import mongoose from "mongoose";
import { createApp } from "./app";
import { mongoUri, port } from "./config/envs";

(async () => {
  await mongoose.connect(mongoUri);
  console.log("mongo connected");

  const app = createApp();

  app.listen(port, () => {
    console.log(`Api listening on port ${port}`);
  });
})();
