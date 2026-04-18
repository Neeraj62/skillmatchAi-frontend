// ─── Auth Input Validators ──────────────────────────────────────────
// Lightweight validation middleware — no external library needed.
// Runs BEFORE the controller so bad requests never hit the DB.

import ApiError from "../../utils/ApiError.js";

// ─── Constants ──────────────────────────────────────────────────────
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const ALLOWED_ROLES = ["user", "recruiter"];
const PASSWORD_MIN_LENGTH = 8;

/**
 * Validate signup request body
 */
export const validateSignup = (req, _res, next) => {
  const errors = [];
  const { name, email, password, role } = req.body;

  // Name checks
  if (!name || typeof name !== "string" || !name.trim()) {
    errors.push("Name is required");
  } else if (name.trim().length < 2 || name.trim().length > 100) {
    errors.push("Name must be between 2 and 100 characters");
  }

  // Email checks
  if (!email || typeof email !== "string" || !email.trim()) {
    errors.push("Email is required");
  } else if (!EMAIL_REGEX.test(email.trim())) {
    errors.push("Please provide a valid email address");
  }

  // Password checks
  if (!password || typeof password !== "string") {
    errors.push("Password is required");
  } else if (password.length < PASSWORD_MIN_LENGTH) {
    errors.push(`Password must be at least ${PASSWORD_MIN_LENGTH} characters`);
  }

  // Role check (optional field — only validate if provided)
  if (role && !ALLOWED_ROLES.includes(role)) {
    errors.push(`Role must be one of: ${ALLOWED_ROLES.join(", ")}`);
  }

  if (errors.length > 0) {
    return next(new ApiError(422, "Validation failed", errors));
  }

  // Sanitize — trim whitespace before it reaches the controller
  req.body.name = name.trim();
  req.body.email = email.trim().toLowerCase();

  next();
};

/**
 * Validate login request body
 */
export const validateLogin = (req, _res, next) => {
  const errors = [];
  const { email, password } = req.body;

  if (!email || typeof email !== "string" || !email.trim()) {
    errors.push("Email is required");
  } else if (!EMAIL_REGEX.test(email.trim())) {
    errors.push("Please provide a valid email address");
  }

  if (!password || typeof password !== "string") {
    errors.push("Password is required");
  }

  if (errors.length > 0) {
    return next(new ApiError(422, "Validation failed", errors));
  }

  req.body.email = email.trim().toLowerCase();

  next();
};
