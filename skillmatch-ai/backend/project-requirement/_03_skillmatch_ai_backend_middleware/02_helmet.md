# 🪖 Helmet Middleware

> **Status:** ❌ Missing — MUST ADD
> **Package:** `helmet`
> **Why:** Sets essential HTTP security headers to prevent XSS, clickjacking, MIME sniffing, etc.

---

## Install
```bash
npm install helmet
```

## Implementation
```javascript
import helmet from "helmet";
app.use(helmet());
```

## What Helmet Sets
| Header | Purpose |
|--------|---------|
| `X-Content-Type-Options: nosniff` | Prevents MIME type sniffing |
| `X-Frame-Options: DENY` | Prevents clickjacking |
| `X-XSS-Protection: 0` | Disables browser XSS filter (modern CSP is better) |
| `Strict-Transport-Security` | Forces HTTPS |
| `Content-Security-Policy` | Controls resource loading |
| `Referrer-Policy` | Controls referrer info sent |

## Position in Chain
```
1. helmet() ← First middleware (before anything else)
2. cors()
3. Express parsers
...
```
