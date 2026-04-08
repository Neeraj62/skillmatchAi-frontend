// ─── Auth Controller (Production-Grade) ─────────────────────────────
//
//  Key improvements over the original:
//  1. asyncHandler   — eliminates repetitive try/catch
//  2. ApiError       — structured errors with proper HTTP codes
//  3. ApiResponse    — consistent response shape across all endpoints
//  4. JWT tokens     — access + refresh token pair for secure auth
//  5. No console.log — uses structured error propagation instead
//  6. Explicit field selection via .select() — defense-in-depth
//  7. Mongoose lean() where appropriate for read-only queries
//  8. Refresh token persisted on the user document for revocation

import User from "../user/user.model.js";
import ApiError from "../../utils/ApiError.js";
import ApiResponse from "../../utils/ApiResponse.js";
import asyncHandler from "../../utils/asyncHandler.js";
import generateTokens from "../../utils/generateTokens.js";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  SIGNUP
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const signup = asyncHandler(async (req, res) => {
  const { name, email, password, role } = req.body;

  // ── 1. Duplicate check (lean → faster, no Mongoose hydration) ──
  const existingUser = await User.findOne({ email }).lean();
  if (existingUser) {
    throw new ApiError(409, "An account with this email already exists");
  }

  // ── 2. Create user ────────────────────────────────────────────
  const user = await User.create({ name, email, password, role });

  // ── 3. Generate JWT pair ──────────────────────────────────────
  const { accessToken, refreshToken } = generateTokens(user);

  // ── 4. Persist refresh token (hashed in a real prod setup) ────
  user.refreshToken = refreshToken;
  await user.save({ validateBeforeSave: false });

  // ── 5. Build safe user object (strip sensitive fields) ────────
  const safeUser = {
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    isVerified: user.isVerified,
    createdAt: user.createdAt,
  };

  // ── 6. Respond ────────────────────────────────────────────────
  res.status(201).json(
    new ApiResponse(201, "Account created successfully", {
      user: safeUser,
      accessToken,
      refreshToken,
    })
  );
});

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  LOGIN
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // ── 1. Find user WITH password (select: false by default) ─────
  const user = await User.findOne({ email }).select("+password +refreshToken");
  if (!user) {
    throw new ApiError(401, "Invalid email or password");
  }

  // ── 2. Verify password ────────────────────────────────────────
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    // Same message as above → prevents email enumeration attacks
    throw new ApiError(401, "Invalid email or password");
  }

  // ── 3. Generate new JWT pair ──────────────────────────────────
  const { accessToken, refreshToken } = generateTokens(user);

  // ── 4. Persist new refresh token ──────────────────────────────
  user.refreshToken = refreshToken;
  await user.save({ validateBeforeSave: false });

  // ── 5. Build safe user object ─────────────────────────────────
  const safeUser = {
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    isVerified: user.isVerified,
    createdAt: user.createdAt,
  };

  // ── 6. Respond ────────────────────────────────────────────────
  res.status(200).json(
    new ApiResponse(200, "Logged in successfully", {
      user: safeUser,
      accessToken,
      refreshToken,
    })
  );
});

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  LOGOUT
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const logout = asyncHandler(async (req, res) => {
  if (!req.user?._id) {
    throw new ApiError(401, "User not authenticated");
  }

  // req.user is set by authMiddleware (JWT decoded payload)
  await User.findByIdAndUpdate(
    req.user._id,
    { $unset: { refreshToken: 1 } },   // revoke refresh token
    { new: true }
  );

  res.status(200).json(
    new ApiResponse(200, "Logged out successfully")
  );
});
