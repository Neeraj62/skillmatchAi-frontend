# Phase 3: User Dashboard Backend (MVP 3)

> **Duration:** Week 3-4 | **Goal:** Profile CRUD, Resume upload, Job browse & apply APIs

---

## Tasks

### Models
- [ ] **3.1** Create `src/modules/profile/candidateProfile.model.js` (full schema)
- [ ] **3.2** Create `src/modules/profile/candidateSkill.model.js`
- [ ] **3.3** Create `src/modules/profile/candidateEducation.model.js`
- [ ] **3.4** Create `src/modules/profile/candidateExperience.model.js`
- [ ] **3.5** Create `src/modules/resume/resume.model.js` (with AI fields)
- [ ] **3.6** Create `src/modules/application/application.model.js`

### Profile APIs (15 endpoints)
- [ ] **3.7** `GET /api/v1/user/profile` — get current profile
- [ ] **3.8** `POST /api/v1/user/profile` — create profile (first-time)
- [ ] **3.9** `PUT /api/v1/user/profile` — update profile
- [ ] **3.10** `PUT /api/v1/user/profile/avatar` — upload avatar (multer + Cloudinary)
- [ ] **3.11** `POST /api/v1/user/profile/skills` — add skill
- [ ] **3.12** `DELETE /api/v1/user/profile/skills/:id` — remove skill
- [ ] **3.13** `POST /api/v1/user/profile/education` — add education
- [ ] **3.14** `PUT /api/v1/user/profile/education/:id` — update education
- [ ] **3.15** `DELETE /api/v1/user/profile/education/:id` — remove education
- [ ] **3.16** `POST /api/v1/user/profile/experience` — add experience
- [ ] **3.17** `PUT /api/v1/user/profile/experience/:id` — update experience
- [ ] **3.18** `DELETE /api/v1/user/profile/experience/:id` — remove experience
- [ ] **3.19** `GET /api/v1/user/settings` — get settings
- [ ] **3.20** `PUT /api/v1/user/settings` — update settings
- [ ] **3.21** `PUT /api/v1/user/settings/password` — change password

### Resume APIs (5 endpoints)
- [ ] **3.22** `POST /api/v1/user/resumes` — upload resume (multer → Cloudinary)
- [ ] **3.23** `GET /api/v1/user/resumes` — list resumes
- [ ] **3.24** `DELETE /api/v1/user/resumes/:id` — delete resume
- [ ] **3.25** `PUT /api/v1/user/resumes/:id/set-primary` — set primary
- [ ] **3.26** `GET /api/v1/user/resumes/:id/analysis` — get AI analysis

### Job Browse & Apply APIs
- [ ] **3.27** `GET /api/v1/jobs` — public job listings with filters & pagination
- [ ] **3.28** `GET /api/v1/jobs/:id` — single job detail
- [ ] **3.29** `POST /api/v1/jobs/:id/apply` — apply to job (creates application)
- [ ] **3.30** `GET /api/v1/user/applications` — list user's applications
- [ ] **3.31** `GET /api/v1/user/applications/:id` — application detail

### Route Registration
- [ ] **3.32** Register all routes in `src/index.js`
- [ ] **3.33** Add Swagger docs for all new endpoints

---

## Acceptance Criteria
- [ ] Profile CRUD works for all sub-resources (skills, education, experience)
- [ ] Resume upload stores file on Cloudinary and saves metadata in MongoDB
- [ ] Job listing supports keyword search, filters, pagination, and sorting
- [ ] Apply creates an application doc with user → job → resume ObjectId links
- [ ] Password change verifies old password before updating
