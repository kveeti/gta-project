import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: { type: String },
    name: { type: String },
    cars: [{ type: mongoose.Schema.Types.ObjectId, ref: "car" }],
    garages: [{ type: mongoose.Schema.Types.ObjectId, ref: "garage" }],
  },
  { collection: "users", timestamps: true }
);

export const userModel = mongoose.model("user", userSchema);
