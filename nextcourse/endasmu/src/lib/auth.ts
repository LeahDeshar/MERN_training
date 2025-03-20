import bcrypt from "bcrypt";

import { connectDB } from "./db";
import { User } from "@/models/User";

export async function verifyUser(email: string, password: string) {
  await connectDB();

  const user = await User.findOne({ email });

  if (!user) {
    return null;
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return null;
  }

  return {
    id: user._id.toString(),
    email: user.email,
    name: user.name,
  };
}
