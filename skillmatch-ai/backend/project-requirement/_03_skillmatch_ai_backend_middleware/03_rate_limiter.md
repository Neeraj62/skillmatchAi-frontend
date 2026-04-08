# ⏱️ Rate Limiter Middleware

> **Status:** ❌ Missing — MUST ADD
> **Package:** `express-rate-limit`
> **Why:** Prevents brute-force attacks on login, abuse of AI endpoints, and DDoS.

---

## Install
```bash
npm install express-rate-limit
```

## Implementation
```javascript
import rateLimit from "express-rate-limit";

// General API rate limit
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,  // 15 minutes
  max: 100,                   // 100 requests per window per IP
  message: { success: false, message: "Too many requests. Try again in 15 minutes." },
  standardHeaders: true,
  legacyHeaders: false,
});

// Strict limiter for auth endpoints
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,                    // Only 10 login/signup attempts per 15 min
  message: { success: false, message: "Too many auth attempts. Try again later." },
});

// AI endpoint limiter
const aiLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,  // 1 hour
  max: 20,                    // 20 AI calls per hour per IP
  message: { success: false, message: "AI usage limit exceeded. Try again later." },
});

// Apply
app.use("/api/v1", generalLimiter);
app.use("/api/v1/auth", authLimiter);
app.use("/api/v1/user/resumes", aiLimiter);
```

## Rate Limit Headers (Response)
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 87
X-RateLimit-Reset: 1679900000
```
