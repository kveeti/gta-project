import mongoose, { ObjectId } from "mongoose";
import { CarDoc } from "./car";
import { GarageDoc } from "./garage";

export interface User {
  owner: string;
  email: string;
  cars: ObjectId[];
  garages: ObjectId[];
}

export interface IdUser {
  _id: ObjectId;
  owner: string;
  email: string;
  cars: ObjectId[];
  garages: ObjectId[];
}

export interface UserDoc extends mongoose.Document, User {}

export interface PopulatedUser {
  owner: string;
  email: string;
  cars: CarDoc[];
  garages: GarageDoc[];
}

const schema: mongoose.Schema = new mongoose.Schema(
  {
    owner: { type: String },
    email: { type: String, unique: true },
    cars: [{ type: mongoose.Schema.Types.ObjectId, ref: "car" }],
    garages: [{ type: mongoose.Schema.Types.ObjectId, ref: "garage" }],
  },
  { collection: "users", timestamps: true }
);

export const UserModel = mongoose.model<UserDoc>("user", schema);
