# 📝 Morgan Logger + Compression + Request ID

---

## 9. Morgan — HTTP Request Logger

```bash
npm install morgan
```

```javascript
import morgan from "morgan";

// Development: colored short format
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Production: combined format (includes IP, user-agent)
if (process.env.NODE_ENV === "production") {
  app.use(morgan("combined"));
}
```

**Output:** `GET /api/v1/jobs 200 12.345ms - 1234`

---

## 10. Compression — Gzip Responses

```bash
npm install compression
```

```javascript
import compression from "compression";
app.use(compression()); // Compresses all responses > 1KB
```

**Impact:** Reduces API response sizes by 60-80%, especially for large JSON (job listings, applicant data).

---

## 11. Request ID — Unique Tracking

```javascript
// src/middlewares/requestId.js
import { randomUUID } from "crypto";

const requestId = (req, res, next) => {
  req.id = req.headers["x-request-id"] || randomUUID();
  res.setHeader("X-Request-Id", req.id);
  next();
};

export default requestId;
```

**Usage:** Include `req.id` in error logs for debugging production issues.

---

## 12. Complete Middleware Order in `index.js`

```javascript
import express from "express";
import helmet from "helmet";
import cors from "cors";
import compression from "compression";
import morgan from "morgan";
import mongoSanitize from "express-mongo-sanitize";
import rateLimit from "express-rate-limit";
import requestId from "./middlewares/requestId.js";
import globalErrorHandler, { notFoundHandler } from "./middlewares/globalErrorHandler.js";

const app = express();

// 1. Security headers
app.use(helmet());

// 2. CORS
app.use(cors(corsOptions));

// 3. Compression
app.use(compression());

// 4. Logger
app.use(morgan(process.env.NODE_ENV === "production" ? "combined" : "dev"));

// 5. Request ID
app.use(requestId);

// 6. Body parsers
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));

// 7. Sanitization
app.use(mongoSanitize());

// 8. Rate limiting
app.use("/api/v1", generalLimiter);
app.use("/api/v1/auth", authLimiter);

// 9. Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/recruiter", recruiterRoutes);
app.use("/api/v1/jobs", jobRoutes);
app.use("/api/v1/notifications", notificationRoutes);
app.use("/api/v1/skills", skillRoutes);

// 10. Error handling
app.use(notFoundHandler);
app.use(globalErrorHandler);

export default app;
```

## NPM Install Summary
```bash
npm install helmet express-rate-limit express-validator express-mongo-sanitize compression morgan
```
