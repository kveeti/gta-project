import mongoose from "mongoose";

const garageSchema = new mongoose.Schema({
  ID: { type: Number, require: true },
  name: { type: String, require: true },
  desc: { type: String },
  owner: { type: String, require: true },
});

export const garageModel = mongoose.model("garage", garageSchema);
