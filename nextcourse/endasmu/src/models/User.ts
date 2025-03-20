import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true }, // Store hashed passwords
});

export const User = mongoose.models.User || mongoose.model("User", UserSchema);
