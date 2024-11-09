import { NextResponse } from "next/server";

export const config = {
  matcher: "/api/:path",
};

export default function middleware(request: Request) {
  return NextResponse.next();
}
