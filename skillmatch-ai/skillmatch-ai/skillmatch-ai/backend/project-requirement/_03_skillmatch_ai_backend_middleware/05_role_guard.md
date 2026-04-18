# 🎭 Role Guard Middleware

> **Status:** ❌ Missing — MUST ADD
> **Why:** Ensures only `user` can access user APIs and only `recruiter` can access recruiter APIs.

---

## Implementation
```javascript
// src/middlewares/roleGuard.js
const roleGuard = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `Access denied. Required role: ${allowedRoles.join(" or ")}`,
      });
    }
    next();
  };
};

export default roleGuard;
```

## Usage in Routes
```javascript
import authMiddleware from "../middlewares/authMiddleware.js";
import roleGuard from "../middlewares/roleGuard.js";

// Only job seekers
router.get("/profile", authMiddleware, roleGuard("user"), getProfile);

// Only recruiters
router.post("/jobs", authMiddleware, roleGuard("recruiter"), createJob);

// Both roles (e.g., notifications)
router.get("/notifications", authMiddleware, roleGuard("user", "recruiter"), getNotifications);
```

## Chain: `authMiddleware` → `roleGuard` → `controller`
- `authMiddleware` verifies JWT and sets `req.user`
- `roleGuard` checks `req.user.role` against allowed roles
- If role doesn't match → 403 Forbidden
