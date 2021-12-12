import mongoose, { ObjectId } from "mongoose";

interface ICar {
  name: string;
  manufacturer: string;
  price: number;
  class: string;
  garage: ObjectId;
  owner: string;
}

export interface Car extends ICar {
  _id: ObjectId;
}

export interface GameDoc extends mongoose.Document, ICar {}

const schema: mongoose.Schema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    manufacturer: { type: String, required: true },
    price: { type: Number, required: true },
    class: { type: String, required: true },
    garage: { type: mongoose.Schema.Types.ObjectId, required: true },
    owner: { type: Boolean, required: true },
  },
  { timestamps: true }
);

export const CarModel = mongoose.model<GameDoc>("car", schema);
