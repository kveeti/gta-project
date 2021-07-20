import mongoose from "mongoose";

const possibleCarSchema = new mongoose.Schema(
  {
    name: { type: String },
    images: {
      frontQuarter: { type: String },
      rearQuarter: { type: String },
      front: { type: String },
      rear: { type: String },
      side: { type: String },
    },
    manufacturer: { type: String },
    price: { type: Number },
    class: { type: String },
  },
  { collection: "possibleCars" }
);

export const possibleCarModel = mongoose.model(
  "possibleCar",
  possibleCarSchema
);
