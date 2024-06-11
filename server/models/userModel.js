import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['employee', 'manager'], required: true },
  location: { type: String, required: true }
});

export const UserModel = mongoose.model("User", userSchema);
