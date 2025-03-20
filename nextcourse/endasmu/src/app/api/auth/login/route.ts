import { NextResponse } from "next/server";
import { verifyUser } from "@/lib/auth";
import { signJWT } from "@/lib/jwt";

export async function POST(request: Request) {
  const { email, password } = await request.json();
  const user = await verifyUser(email, password);

  if (!user) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  // Generate JWT Token
  const token = signJWT(user);

  return NextResponse.json({ message: "Login successful", token });
}
