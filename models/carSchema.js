import mongoose from "mongoose";

const carSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },

    manufacturer: { type: String, required: true },
    price: { type: Number, required: true },
    class: { type: String, required: true },
    ID: { type: Number, required: true },
    garage: {
      name: { type: String, required: true },
      desc: { type: String },
      ID: { type: Number, required: true },
    },
    owner: { type: String, required: true },
  },
  { collection: "cars" }
);

export const carModel = mongoose.model("car", carSchema);
