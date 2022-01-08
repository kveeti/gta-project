import { ObjectId } from "mongoose";

export interface ErrorCars {
  reason: string;
  id: ObjectId;
}
