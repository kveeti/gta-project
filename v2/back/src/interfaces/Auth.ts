import { ObjectId } from "mongoose";

export interface Auth {
  userId: string;
  dbId: ObjectId;
  email: string;
}
