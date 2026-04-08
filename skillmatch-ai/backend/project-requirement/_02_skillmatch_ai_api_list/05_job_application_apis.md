# 📝 Job Application APIs (User Side)

> **Module:** User Dashboard — Apply to Jobs & Track Applications
> **Base Route:** `/api/v1`
> **Auth Required:** ✅ Bearer JWT (role: `user`)
> **Purpose:** Apply to jobs, track application status, withdraw applications.

---

## 1. POST `/api/v1/jobs/:id/apply`

| Property | Value |
|----------|-------|
| **Purpose** | Apply for a specific job posting |
| **Auth** | ✅ Bearer JWT (user) |
| **Collections** | `applications` (creates new doc) |
| **ObjectId Links** | `application.user → users._id`, `application.job → jobs._id`, `application.resume → resumes._id` |
| **Validation** | User must have ≥1 uploaded resume • Cannot apply twice to same job (unique index) |
| **Async Trigger** | Adds job to `matchQueue` → computes AI match score |
| **Side Effect** | Increments `jobs.applicationsCount` |

**Request Body:**
```json
{
  "resumeId": "665b...",     // ObjectId of resume to use
  "coverLetter": "I am passionate about this role because..."  // Optional
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "Application submitted successfully. AI match score is being computed.",
  "data": {
    "_id": "665e...",
    "user": "665a...",
    "job": "665c...",
    "resume": "665b...",
    "status": "applied",
    "aiMatchScore": null,  // null until AI computes it
    "appliedAt": "2026-03-25T10:00:00Z"
  }
}
```

**How it connects:**
1. Creates an `applications` doc linking `users._id` + `jobs._id` + `resumes._id`
2. Bull `matchQueue` processes: fetches `resumes.aiSkills` + `jobs.requiredSkills` → calls OpenAI → computes score
3. Score saved to `applications.aiMatchScore` + `applications.aiMatchBreakdown`
4. Notification created for the recruiter: "New applicant for [Job Title]"
5. Status initially `"applied"` → recruiter changes it through their pipeline APIs
6. Confirmation email queued for the user

---

## 2. GET `/api/v1/user/applications`

| Property | Value |
|----------|-------|
| **Purpose** | List all job applications by the logged-in user |
| **Auth** | ✅ Bearer JWT (user) |
| **Collections** | `applications` (find by `{ user: req.user.id }`) |
| **Populate** | `.populate("job", "title location jobType")` + company info |

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "_id": "665e...",
      "job": {
        "_id": "665c...",
        "title": "Senior React Developer",
        "company": "TechCorp",
        "location": "Bangalore"
      },
      "status": "shortlisted",
      "aiMatchScore": 87,
      "appliedAt": "2026-03-25T10:00:00Z"
    }
  ]
}
```

**How it connects:**
- Displayed on `/dashboard/applied` page with status badges (applied=blue, shortlisted=green, rejected=red).
- Each row links back to job detail via `job._id`.

---

## 3. GET `/api/v1/user/applications/:id`

| Property | Value |
|----------|-------|
| **Purpose** | Get full detail of a single application |
| **Auth** | ✅ Bearer JWT (user) |
| **Collections** | `applications` (find by `_id`) |
| **Populate** | `.populate("job resume")` — full job + resume data |

**Response (200):**
```json
{
  "success": true,
  "data": {
    "_id": "665e...",
    "job": { "_id": "665c...", "title": "...", "description": "...", "requiredSkills": [...] },
    "resume": { "_id": "665b...", "filename": "..." },
    "status": "shortlisted",
    "aiMatchScore": 87,
    "aiMatchBreakdown": {
      "matchedRequiredSkills": ["react", "typescript"],
      "missingRequiredSkills": ["node.js"],
      "aiRecommendation": "Good Match",
      "shortSummary": "Strong frontend skills but missing backend experience"
    },
    "statusHistory": [
      { "status": "applied", "changedAt": "2026-03-25T10:00:00Z" },
      { "status": "screening", "changedAt": "2026-03-26T14:00:00Z" },
      { "status": "shortlisted", "changedAt": "2026-03-27T09:00:00Z" }
    ],
    "appliedAt": "2026-03-25T10:00:00Z"
  }
}
```

---

## 🔗 Application Flow

```
POST /jobs/:id/apply
  ├── Creates applications doc → links users._id + jobs._id + resumes._id
  ├── Triggers matchQueue → AI computes match score
  ├── Triggers email notification to user (confirmation)
  ├── Triggers notification to recruiter (new applicant)
  └── Increments jobs.applicationsCount

GET /user/applications
  └── Lists all applications with job info + status + score

GET /user/applications/:id
  └── Full detail with AI breakdown + status history timeline
```
