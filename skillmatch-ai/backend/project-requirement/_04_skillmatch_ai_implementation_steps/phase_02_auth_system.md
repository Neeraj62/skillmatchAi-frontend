# Phase 2: Authentication System (MVP 2)

> **Duration:** Week 2-3 | **Goal:** Complete auth with JWT, refresh tokens, role-based routing

---

## Tasks

### Schema & Model
- [ ] **2.1** Update `user.model.js` with full schema
  - Add: `phone`, `isVerified`, `refreshToken` (select: false)
  - Add: `comparePassword` instance method
  - Update bcrypt salt rounds from 10 → 12

### Auth Module
- [ ] **2.2** Create `src/modules/auth/` folder with modular structure
  - `auth.controller.js`, `auth.routes.js`, `auth.service.js`, `auth.swagger.js`

- [ ] **2.3** Implement `POST /api/v1/auth/signup`
  - Validate inputs with `authValidator.js`
  - Check duplicate email → 409
  - Hash password, create user in `users` collection
  - Generate accessToken (15min) + refreshToken (7d)
  - Queue welcome email

- [ ] **2.4** Implement `POST /api/v1/auth/login`
  - Find user by email → 404 if not found
  - Compare password with bcrypt → 401 if wrong
  - Generate JWT tokens, return user data

- [ ] **2.5** Implement `POST /api/v1/auth/logout`
  - Clear `refreshToken` from user document
  - Return 200

- [ ] **2.6** Implement `POST /api/v1/auth/refresh`
  - Validate refresh token
  - Generate new access token
  - Optionally rotate refresh token

- [ ] **2.7** Implement `GET /api/v1/auth/me`
  - Protected route (authMiddleware)
  - Return current user from `req.user.id`

### Token Utilities
- [ ] **2.8** Create `src/utils/jwtUtils.js`
  - `generateAccessToken(userId, role)` — expires 15 min
  - `generateRefreshToken(userId)` — expires 7 days
  - `verifyToken(token, secret)` — returns decoded payload

### Middleware Updates
- [ ] **2.9** Update `authMiddleware.js` with improvements
  - Fetch user from DB, differentiate expired vs invalid tokens

- [ ] **2.10** Create `roleGuard.js` middleware

### Routes Registration
- [ ] **2.11** Register auth routes in `src/index.js`
  ```javascript
  app.use("/api/v1/auth", authRoutes);
  ```

### Seed Data
- [ ] **2.12** Create `src/config/seed.js`
  - Seed test user: `test-user@example.com / TestUser123`
  - Seed test recruiter: `test-recruiter@example.com / TestRecruiter123`

### Swagger
- [ ] **2.13** Document all 5 auth endpoints in `auth.swagger.js`

---

## Acceptance Criteria
- [ ] Signup creates user with hashed password
- [ ] Login returns valid JWT tokens
- [ ] Protected routes reject unauthenticated requests (401)
- [ ] RoleGuard rejects wrong-role requests (403)
- [ ] Refresh token generates new access token
- [ ] Logout invalidates refresh token
