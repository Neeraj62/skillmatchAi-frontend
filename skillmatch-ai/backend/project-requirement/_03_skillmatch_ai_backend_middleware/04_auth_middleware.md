# 🔑 Auth Middleware (Improved)

> **Status:** ✅ Exists — needs improvements
> **Why:** Your current auth middleware works but is missing role extraction and refresh token rotation.

---

## Current vs Improved

```diff
 import jwt from "jsonwebtoken";
 import env from "../config/envConfig.js";
+import User from "../modules/user/user.model.js";

 const authMiddleware = async (req, res, next) => {
   const authHeader = req.headers.authorization;
   if (!authHeader || !authHeader.startsWith("Bearer ")) {
     return res.status(401).json({ success: false, message: "No token provided" });
   }
   const token = authHeader.split(" ")[1];
   try {
     const decoded = jwt.verify(token, env.JWT_SECRET);
-    req.user = decoded;
+    // Fetch fresh user data (ensures user still exists and not deleted)
+    const user = await User.findById(decoded.id).select("name email role isVerified");
+    if (!user) {
+      return res.status(401).json({ success: false, message: "User no longer exists" });
+    }
+    req.user = { id: user._id, name: user.name, email: user.email, role: user.role };
     next();
   } catch (error) {
+    if (error.name === "TokenExpiredError") {
+      return res.status(401).json({ success: false, message: "Token expired", code: "TOKEN_EXPIRED" });
+    }
     return res.status(401).json({ success: false, message: "Invalid or expired token" });
   }
 };
```

## Key Improvements
1. **Fetches user from DB** — ensures deleted/banned users can't use old tokens
2. **Differentiates expired vs invalid** — frontend can auto-refresh on `TOKEN_EXPIRED`
3. **Attaches full user object** — controllers have `req.user.role` available
