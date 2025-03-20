import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";

export function middleware(request: Request) {
  const { pathname } = new URL(request.url);

  // Define protected routes
  const protectedRoutes = ["/dashboard", "/api/protected"];

  if (protectedRoutes.some((route) => pathname.startsWith(route))) {
    const token = request.headers.get("Authorization");

    if (!token || !verifyToken(token)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  return NextResponse.next();
}
