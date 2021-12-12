import mongoose from "mongoose";

export interface ModelCar {
  name: string;
  manufacturer: string;
  price: number;
  class: string;
}

export interface ModelCarDoc extends mongoose.Document, ModelCar {}

const schema: mongoose.Schema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    manufacturer: { type: String, required: true },
    price: { type: Number, required: true },
    class: { type: String, required: true },
  },
  { collection: "model-cars" }
);

export const ModelCarModel = mongoose.model<ModelCarDoc>("modelcar", schema);
