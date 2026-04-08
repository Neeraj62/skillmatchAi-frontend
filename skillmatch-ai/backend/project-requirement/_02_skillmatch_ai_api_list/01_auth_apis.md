# 🔐 Auth APIs

> **Module:** Authentication & Authorization
> **Base Route:** `/api/v1/auth`
> **Purpose:** Handle user registration, login, token management, and session. This is the entry point — every other API depends on the JWT token generated here.

---

## 1. POST `/api/v1/auth/signup`

| Property | Value |
|----------|-------|
| **Purpose** | Register a new user (Job Seeker or Recruiter) |
| **Auth Required** | ❌ No |
| **Collections Involved** | `users` (creates new document) |
| **Related APIs** | → Triggers `POST /api/v1/auth/login` flow (auto-login after signup) |

**Request Body:**
```json
{
  "name": "Ashutosh Kumar",
  "email": "ashutosh@example.com",
  "password": "SecurePass123",
  "role": "user"  // "user" or "recruiter"
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "Account created successfully",
  "data": {
    "user": { "_id": "665a...", "name": "Ashutosh Kumar", "email": "ashutosh@example.com", "role": "user" },
    "accessToken": "eyJhbGciOi...",
    "refreshToken": "eyJhbGciOi..."
  }
}
```

**How it connects:**
- Creates a document in `users` collection → `users._id` becomes the root ObjectId for all future data.
- After signup, frontend redirects based on `role`:
  - `user` → `/dashboard/profile` (triggers need for `POST /api/v1/user/profile`)
  - `recruiter` → `/recruiter/overview` (triggers need for `POST /api/v1/recruiter/profile`)
- Welcome email is queued via the Notification service.

---

## 2. POST `/api/v1/auth/login`

| Property | Value |
|----------|-------|
| **Purpose** | Authenticate existing user and return JWT tokens |
| **Auth Required** | ❌ No |
| **Collections Involved** | `users` (read + compare password) |
| **Related APIs** | → Returned `accessToken` is used by ALL protected APIs |

**Request Body:**
```json
{
  "email": "ashutosh@example.com",
  "password": "SecurePass123"
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "user": { "_id": "665a...", "name": "Ashutosh Kumar", "email": "ashutosh@example.com", "role": "user" },
    "accessToken": "eyJhbGciOi...",
    "refreshToken": "eyJhbGciOi..."
  }
}
```

**How it connects:**
- The `accessToken` is attached as `Authorization: Bearer <token>` header to all subsequent API calls.
- The `user._id` from login response is used to fetch profile, resumes, applications, etc.
- `refreshToken` is stored for auto-renewal when accessToken expires (15 min).

---

## 3. POST `/api/v1/auth/logout`

| Property | Value |
|----------|-------|
| **Purpose** | Invalidate the refresh token, ending the session |
| **Auth Required** | ✅ Bearer JWT |
| **Collections Involved** | `users` (clear `refreshToken` field) |
| **Related APIs** | → Frontend clears stored tokens, redirects to `/login` |

**Response (200):**
```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

---

## 4. POST `/api/v1/auth/refresh`

| Property | Value |
|----------|-------|
| **Purpose** | Generate a new access token using a valid refresh token |
| **Auth Required** | ❌ No (but requires valid `refreshToken` in body) |
| **Collections Involved** | `users` (validate refreshToken) |
| **Related APIs** | → Called automatically by Axios interceptor on 401 response |

**Request Body:**
```json
{
  "refreshToken": "eyJhbGciOi..."
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "accessToken": "eyJhbGciOi... (new)"
  }
}
```

**How it connects:**
- The Axios interceptor in the frontend detects a 401 response → calls this API → gets a new token → retries the original request.
- If this API also returns 401 (invalid refresh token), user is forced to re-login.

---

## 5. GET `/api/v1/auth/me`

| Property | Value |
|----------|-------|
| **Purpose** | Return the currently authenticated user's basic info |
| **Auth Required** | ✅ Bearer JWT |
| **Collections Involved** | `users` (read by `req.user.id`) |
| **Related APIs** | → Used on page load to verify auth state and determine dashboard routing |

**Response (200):**
```json
{
  "success": true,
  "data": {
    "_id": "665a...",
    "name": "Ashutosh Kumar",
    "email": "ashutosh@example.com",
    "role": "user",
    "isVerified": false,
    "createdAt": "2026-03-17T10:00:00Z"
  }
}
```

**How it connects:**
- Called on app load (before rendering any protected route).
- The `role` field determines which dashboard layout to show (`UserDashboardLayout` vs `RecruiterDashboardLayout`).
- The `_id` is used as `req.user.id` in all subsequent profile/resume/application queries.

---

## 🔗 API Relationship Chain

```
POST /auth/signup (creates users._id)
    └── POST /auth/login (returns JWT with users._id)
        └── GET /auth/me (verifies token, returns user data)
            ├── All /user/* APIs use req.user.id (from JWT)
            ├── All /recruiter/* APIs use req.user.id (from JWT)
            └── POST /auth/refresh (renews expired accessToken)
                └── POST /auth/logout (invalidates refreshToken)
```
