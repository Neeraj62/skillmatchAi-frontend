// ─── JWT Token Generator ────────────────────────────────────────────
// Generates both access and refresh tokens for a user.
// Access token  → short-lived (15 min) for API requests
// Refresh token → long-lived (7 days) for silent re-auth

import jwt from "jsonwebtoken";
import env from "../config/envConfig.js";

/**
 * Generate an access + refresh token pair for the given user.
 * @param {Object} user - Mongoose user document
 * @returns {{ accessToken: string, refreshToken: string }}
 */
const generateTokens = (user) => {
  const payload = {
    _id: user._id,
    email: user.email,
    role: user.role,
  };

  const accessToken = jwt.sign(payload, env.JWT_SECRET, {
    expiresIn: "15m",
  });

  const refreshToken = jwt.sign({ _id: user._id }, env.JWT_SECRET, {
    expiresIn: env.JWT_EXPIRE || "7d",
  });

  return { accessToken, refreshToken };
};

export default generateTokens;
