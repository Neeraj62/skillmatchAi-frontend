# 🌐 CORS Middleware

> **Status:** ⚠️ Exists but needs hardening for production
> **Package:** `cors` (already installed)
> **Why:** Controls which frontend domains can call your API.

---

## Current Code (Too Permissive)
```javascript
app.use(cors()); // ❌ Allows ALL origins — unsafe for production
```

## Production Code
```javascript
import cors from "cors";

const corsOptions = {
  origin: (origin, callback) => {
    const allowedOrigins = [
      process.env.FRONTEND_URL,               // e.g., "https://skillmatch-ai.vercel.app"
      "http://localhost:4000",                 // Local dev frontend
    ];
    // Allow requests with no origin (mobile apps, Postman)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,              // Allow cookies (for httpOnly refresh tokens)
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  exposedHeaders: ["X-Request-Id"],
  maxAge: 86400,                  // Cache preflight for 24 hours
};

app.use(cors(corsOptions));
```

## .env Addition
```
FRONTEND_URL=http://localhost:4000
```
