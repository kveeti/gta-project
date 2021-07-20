import mongoose from 'mongoose'; 

const userSchema = new mongoose.Schema(
  {
    email: { type: String },
    name: { type: String },
  },
  { collection: "users", timestamps: true }
);

export const userModel = mongoose.model("user", userSchema);
