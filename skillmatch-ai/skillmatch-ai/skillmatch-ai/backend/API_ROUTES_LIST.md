# 🚀 SkillMatch AI — API Routes & Controllers List

This document provides a module-wise list of all available API endpoints, their methods, and the corresponding controller functions.

---

## 🔐 Auth Module
**Base Route:** `/api/v1/auth`

| Method | Endpoint | Controller Function | Description |
|:---:|:---|:---|:---|
| `POST` | `/signup` | `signup` | Register a new user (Job Seeker or Recruiter) |
| `POST` | `/login` | `login` | Authenticate user and return JWT tokens |
| `POST` | `/logout` | `logout` | Invalidate refresh token and end session |

---

## 👤 User Module
**Base Route:** `/api/v1/users`

| Method | Endpoint | Controller Function | Description |
|:---:|:---|:---|:---|
| `GET` | `/` | `getUsers` | Retrieve a list of all users (Admin) |

---

## 📄 Candidate Profile Module
**Base Route:** `/api/v1/candidate-profile`

| Method | Endpoint | Controller Function | Description |
|:---:|:---|:---|:---|
| `POST` | `/` | `createProfile` | Create or update candidate profile |
| `GET` | `/:userId` | `getProfile` | Get candidate profile by user ID |

---

## 🏢 Recruiter Profile Module
**Base Route:** `/api/v1/recruiter-profile`

| Method | Endpoint | Controller Function | Description |
|:---:|:---|:---|:---|
| `POST` | `/` | `createProfile` | Create or update recruiter profile |
| `GET` | `/:userId` | `getProfile` | Get recruiter profile by user ID |

---

## 🛠️ Candidate Skill Module
**Base Route:** `/api/v1/candidate-skill`

| Method | Endpoint | Controller Function | Description |
|:---:|:---|:---|:---|
| `POST` | `/` | `createSkill` | Add a new skill to candidate profile |
| `GET` | `/profile/:profileId` | `getSkillsByProfile` | Get all skills for a candidate profile |

---

## 🎓 Candidate Education Module
**Base Route:** `/api/v1/candidate-education`

| Method | Endpoint | Controller Function | Description |
|:---:|:---|:---|:---|
| `POST` | `/` | `createEducation` | Add education entry to candidate profile |
| `GET` | `/profile/:profileId` | `getEducationByProfile` | Get all education entries for a profile |

---

## 💼 Candidate Experience Module
**Base Route:** `/api/v1/candidate-experience`

| Method | Endpoint | Controller Function | Description |
|:---:|:---|:---|:---|
| `POST` | `/` | `createExperience` | Add experience entry to candidate profile |
| `GET` | `/profile/:profileId` | `getExperienceByProfile` | Get all experience entries for a profile |

---

## 📄 Resume Module
**Base Route:** `/api/v1/resume`

| Method | Endpoint | Controller Function | Description |
|:---:|:---|:---|:---|
| `POST` | `/` | `uploadResume` | Register an uploaded resume |
| `GET` | `/user/:userId` | `getResumesByUser` | Get all resumes for a specific user |

---

## 🎯 Job Module
**Base Route:** `/api/v1/job`

| Method | Endpoint | Controller Function | Description |
|:---:|:---|:---|:---|
| `POST` | `/` | `createJob` | Create a new job posting |
| `GET` | `/` | `getJobs` | Get all active job postings |

---

## 📥 Application Module
**Base Route:** `/api/v1/application`

| Method | Endpoint | Controller Function | Description |
|:---:|:---|:---|:---|
| `POST` | `/` | `applyForJob` | Submit a job application |
| `GET` | `/job/:jobId` | `getApplicationsByJob` | Get all applicants for a specific job |

---

## 🔔 Notification Module
**Base Route:** `/api/v1/notification`

| Method | Endpoint | Controller Function | Description |
|:---:|:---|:---|:---|
| `GET` | `/user/:userId` | `getNotifications` | Get all notifications for a user |
| `PATCH` | `/:id/read` | `markAsRead` | Mark a specific notification as read |

---

## 🔍 Master Skill Module
**Base Route:** `/api/v1/skill`

| Method | Endpoint | Controller Function | Description |
|:---:|:---|:---|:---|
| `GET` | `/search` | `searchSkills` | Search for skills by name or alias |

---

## 📊 AI Usage Log Module
**Base Route:** `/api/v1/ai-usage-log`

| Method | Endpoint | Controller Function | Description |
|:---:|:---|:---|:---|
| `GET` | `/` | `getUsageLogs` | Get all AI usage and cost logs (Admin) |
