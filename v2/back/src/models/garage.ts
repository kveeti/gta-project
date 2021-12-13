import mongoose, { ObjectId } from "mongoose";
import { CarDoc } from "./car";
import { ModelGarage } from "./ModelGarage";

export interface Garage {
  modelGarage: ObjectId;
  desc: string;
  owner: ObjectId;
  cars: ObjectId[];
}

export interface IdGarage {
  _id: ObjectId;
  modelGarage: ObjectId;
  desc: string;
  owner: ObjectId;
  cars: ObjectId[];
}

export interface PopulatedGarage {
  _id: ObjectId;
  modelGarage: ModelGarage;
  desc: string;
  owner: ObjectId;
  cars: CarDoc[];
}

export interface GarageDoc extends mongoose.Document, Garage {}

const schema: mongoose.Schema = new mongoose.Schema(
  {
    modelGarage: { type: mongoose.Schema.Types.ObjectId, ref: "modelgarage", required: true },
    desc: { type: String, default: "" },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
    cars: [{ type: mongoose.Schema.Types.ObjectId, ref: "car", required: true }],
  },
  { collection: "garages", timestamps: true }
);

export const GarageModel = mongoose.model<GarageDoc>("garage", schema);
