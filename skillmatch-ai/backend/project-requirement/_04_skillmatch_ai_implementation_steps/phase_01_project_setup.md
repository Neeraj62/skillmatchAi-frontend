# Phase 1: Project Setup & Backend Foundation (MVP 1)

> **Duration:** Week 1 | **Goal:** Set up production-ready project structure with all middleware

---

## Tasks

- [ ] **1.1** Verify current project structure matches modular pattern
  - `src/config/`, `src/modules/`, `src/middlewares/`, `src/utils/`, `src/services/`, `src/queues/`

- [ ] **1.2** Install missing production dependencies
  ```bash
  npm install helmet express-rate-limit express-validator express-mongo-sanitize compression morgan
  ```

- [ ] **1.3** Install AI/Queue dependencies (for later phases)
  ```bash
  npm install openai bull ioredis pdf-parse mammoth natural
  ```

- [ ] **1.4** Update `src/index.js` with full middleware chain
  - Add Helmet, CORS hardening, Compression, Morgan, Rate Limiter, Mongo Sanitize
  - Follow the middleware order from `_03_skillmatch_ai_backend_middleware/09_remaining_middleware.md`

- [ ] **1.5** Create `src/middlewares/roleGuard.js`
  - Implement role-based access guard (user / recruiter)

- [ ] **1.6** Create `src/middlewares/requestId.js`
  - Attach unique UUID to every request

- [ ] **1.7** Create `src/middlewares/uploadMiddleware.js`
  - Multer config for resume (PDF/DOCX, 5MB) and image (JPG/PNG, 2MB)

- [ ] **1.8** Create `src/middlewares/validators/` folder
  - `authValidator.js` — signup/login validation rules
  - `profileValidator.js` — profile update validation rules
  - `jobValidator.js` — job creation validation rules

- [ ] **1.9** Update `src/middlewares/globalErrorHandler.js`
  - Handle Mongoose ValidationError, CastError, DuplicateKey
  - Handle JWT errors, Multer errors
  - Add 404 notFoundHandler

- [ ] **1.10** Update `envConfig.js` with all new env variables
  ```
  FRONTEND_URL, REDIS_URL, OPENAI_API_KEY, OPENAI_MODEL,
  AI_MONTHLY_BUDGET_INR, RESEND_API_KEY, EMAIL_FROM
  ```

- [ ] **1.11** Update `.env.example` with all documented variables

- [ ] **1.12** Create `src/config/redis.js` for Bull queue connection

- [ ] **1.13** Set up Swagger documentation at `/api-docs` (already done ✅)

- [ ] **1.14** Add health check route: `GET /api/health → { status: "ok", uptime: ... }`

- [ ] **1.15** Test server starts without errors: `npm run dev`

---

## Acceptance Criteria
- [ ] Server starts without errors
- [ ] All middleware loads in correct order
- [ ] `/api-docs` shows Swagger documentation
- [ ] `/api/health` returns 200 OK
- [ ] `.env.example` has all required variables documented
