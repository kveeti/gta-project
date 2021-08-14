import mongoose from "mongoose";

const garageSchema = new mongoose.Schema({
  ID: { type: Number, require: true },
  name: { type: String, require: true },
  desc: { type: String },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  cars: [{ type: mongoose.Schema.Types.ObjectId, ref: "car" }],
});

export const garageModel = mongoose.model("garage", garageSchema);
