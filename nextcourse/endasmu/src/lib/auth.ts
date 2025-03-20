import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET || "your-secret-key";

/**
 * Verifies the authenticity of a JWT token.
 * @param token - The JWT token to verify.
 * @returns `true` if valid, otherwise `false`.
 */
export function verifyToken(token: string): boolean {
  try {
    jwt.verify(token.replace("Bearer ", ""), SECRET_KEY);
    return true;
  } catch (error: any) {
    console.error("Invalid token:", error.message);
    return false;
  }
}
