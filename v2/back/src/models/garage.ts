import mongoose, { ObjectId } from "mongoose";

interface IGarage {
  name: string;
  desc: string;
  owner: string;
}

export interface Garage extends IGarage {
  _id: ObjectId;
}

export interface GameDoc extends mongoose.Document, IGarage {}

const schema: mongoose.Schema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    desc: { type: String, required: true },
    owner: { type: String, required: true },
  },
  { timestamps: true }
);

export const GarageModel = mongoose.model<GameDoc>("garage", schema);
