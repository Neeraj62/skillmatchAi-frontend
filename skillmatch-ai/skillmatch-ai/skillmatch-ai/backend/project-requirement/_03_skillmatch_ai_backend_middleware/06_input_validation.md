# ✅ Input Validation & Sanitization

> **Status:** ❌ Missing — MUST ADD
> **Package:** `express-validator` or `zod`
> **Why:** Prevents SQL injection, NoSQL injection, XSS, and malformed data from reaching MongoDB.

---

## Install
```bash
npm install express-validator
```

## Example: Signup Validation
```javascript
// src/middlewares/validators/authValidator.js
import { body, validationResult } from "express-validator";

export const signupValidation = [
  body("name").trim().notEmpty().withMessage("Name is required").isLength({ min: 2, max: 100 }),
  body("email").trim().isEmail().withMessage("Valid email is required").normalizeEmail(),
  body("password")
    .isLength({ min: 8 }).withMessage("Password must be at least 8 characters")
    .matches(/[A-Z]/).withMessage("Password must contain an uppercase letter")
    .matches(/[0-9]/).withMessage("Password must contain a number"),
  body("role").isIn(["user", "recruiter"]).withMessage("Role must be user or recruiter"),
];

export const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }
  next();
};
```

## Usage
```javascript
router.post("/signup", signupValidation, validate, signup);
```

## NoSQL Injection Prevention
```bash
npm install express-mongo-sanitize
```
```javascript
import mongoSanitize from "express-mongo-sanitize";
app.use(mongoSanitize()); // Removes $ and . from req.body/query/params
```

## XSS Prevention
```bash
npm install xss-clean
```
```javascript
import xss from "xss-clean";
app.use(xss()); // Sanitizes user input to prevent XSS
```
