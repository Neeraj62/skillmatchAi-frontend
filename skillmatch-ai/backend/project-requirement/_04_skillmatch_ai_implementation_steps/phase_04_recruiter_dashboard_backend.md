# Phase 4: Recruiter Dashboard Backend (MVP 4)

> **Duration:** Week 5-6 | **Goal:** Recruiter profile, job posting lifecycle, applicant pipeline

---

## Tasks

### Models
- [ ] **4.1** Create `src/modules/recruiter/recruiterProfile.model.js`
- [ ] **4.2** Create `src/modules/job/job.model.js` (full schema with status, skills, salary)

### Recruiter Profile APIs (4 endpoints)
- [ ] **4.3** `GET /api/v1/recruiter/profile`
- [ ] **4.4** `POST /api/v1/recruiter/profile`
- [ ] **4.5** `PUT /api/v1/recruiter/profile`
- [ ] **4.6** `PUT /api/v1/recruiter/profile/logo` (multer + Cloudinary)

### Job Management APIs (7 endpoints)
- [ ] **4.7** `POST /api/v1/recruiter/jobs` — create job (default: draft)
- [ ] **4.8** `GET /api/v1/recruiter/jobs` — list recruiter's jobs
- [ ] **4.9** `GET /api/v1/recruiter/jobs/:id` — job detail
- [ ] **4.10** `PUT /api/v1/recruiter/jobs/:id` — update job
- [ ] **4.11** `PATCH /api/v1/recruiter/jobs/:id/status` — change status (activate/pause/close)
- [ ] **4.12** `DELETE /api/v1/recruiter/jobs/:id` — delete draft jobs only
- [ ] **4.13** `GET /api/v1/recruiter/jobs/:id/analytics` — job stats

### Applicant Pipeline APIs (7 endpoints)
- [ ] **4.14** `GET /api/v1/recruiter/jobs/:jobId/applicants` — list applicants with filters
- [ ] **4.15** `GET /api/v1/recruiter/jobs/:jobId/applicants/:applicationId` — applicant detail
- [ ] **4.16** `PATCH /api/v1/recruiter/jobs/:jobId/applicants/:applicationId/status` — update status
  - Push to `statusHistory` array
  - Trigger email notification to candidate
  - Create in-app notification
- [ ] **4.17** `POST /api/v1/recruiter/jobs/:jobId/applicants/bulk-update` — bulk shortlist/reject
- [ ] **4.18** `GET /api/v1/recruiter/shortlisted` — aggregated shortlist across all jobs
- [ ] **4.19** `POST /api/v1/recruiter/jobs/:jobId/applicants/:applicationId/notes` — add recruiter note
- [ ] **4.20** `GET /api/v1/recruiter/jobs/:jobId/applicants/export` — export CSV

### Validation & Guards
- [ ] **4.21** All recruiter routes use `authMiddleware` + `roleGuard("recruiter")`
- [ ] **4.22** Validate recruiter owns the job before any operation
- [ ] **4.23** Add `jobValidator.js` for job creation validation

### Route Registration
- [ ] **4.24** Register all recruiter routes in `src/index.js`
- [ ] **4.25** Add Swagger docs for all endpoints

---

## Acceptance Criteria
- [ ] Recruiter can create, publish, pause, and close jobs
- [ ] Applicant list is filterable by status and sortable by AI match score
- [ ] Status changes push to statusHistory and trigger email notifications
- [ ] Bulk update works for multiple applications
- [ ] CSV export downloads correctly
- [ ] Only recruiters can access these APIs (roleGuard enforced)
