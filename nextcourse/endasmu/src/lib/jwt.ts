import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET || "supersecretkey";

export function signJWT(user: { id: string; email: string }) {
  return jwt.sign(user, SECRET_KEY, { expiresIn: "1h" });
}

/**
 * Verify a JWT token.
 */
export function verifyJWT(token: string) {
  try {
    return jwt.verify(token, SECRET_KEY);
  } catch (error) {
    return null;
  }
}
