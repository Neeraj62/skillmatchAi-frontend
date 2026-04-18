# 🏢 Public Job Listing APIs

> **Module:** Public Job Browsing (accessible by anyone, extra data for authenticated users)
> **Base Route:** `/api/v1/jobs`
> **Purpose:** Job seekers browse active job listings, view details, and get AI match scores (if authenticated).

---

## 1. GET `/api/v1/jobs`

| Property | Value |
|----------|-------|
| **Purpose** | List all published (active) jobs with pagination & filters |
| **Auth Required** | ❌ Public (but if authenticated, includes `aiMatchScore` per job) |
| **Collections** | `jobs` (find by `{ status: "active" }`) |
| **Populate** | Recruiter's `companyName` and `companyLogoUrl` from `recruiter_profiles` |

**Query Parameters:**
| Param | Type | Description |
|-------|------|-------------|
| `keyword` | String | Search in title and description |
| `location` | String | Filter by location |
| `salary_min` | Number | Minimum salary filter |
| `salary_max` | Number | Maximum salary filter |
| `job_type` | String | full-time / part-time / contract / internship / remote |
| `experience_level` | String | entry / mid / senior / lead / executive |
| `page` | Number | Page number (default: 1) |
| `limit` | Number | Results per page (default: 10, max: 50) |
| `sort` | String | `newest` / `match_score` / `salary` |

**Response (200):**
```json
{
  "success": true,
  "data": {
    "jobs": [
      {
        "_id": "665c...",
        "title": "Senior React Developer",
        "company": { "name": "TechCorp", "logoUrl": "https://..." },
        "location": "Bangalore",
        "jobType": "full-time",
        "salaryMin": 80000,
        "salaryMax": 150000,
        "requiredSkills": ["react", "typescript", "node.js"],
        "experienceLevel": "senior",
        "aiMatchScore": 87,  // Only if user is authenticated + has resume
        "createdAt": "2026-03-20T10:00:00Z"
      }
    ],
    "pagination": { "page": 1, "limit": 10, "total": 42, "totalPages": 5 }
  }
}
```

**How it connects:**
- If user is **not authenticated**: shows jobs without `aiMatchScore`.
- If user **is authenticated** and has a **primary resume with AI skills**: the server computes/fetches match score per job from `applications` or on-the-fly from `resumes.aiSkills` vs `jobs.requiredSkills`.
- Landing page shows limited 6 featured jobs (used with `?limit=6&sort=newest`).
- Full job browsing available at `/dashboard/jobs` (after login).

---

## 2. GET `/api/v1/jobs/:id`

| Property | Value |
|----------|-------|
| **Purpose** | Get full details of a single job posting |
| **Auth Required** | ❌ Public |
| **Collections** | `jobs` (find by `_id`) + `recruiter_profiles` (populate company info) |
| **Side Effect** | Increments `jobs.viewsCount` by 1 |

**Response (200):**
```json
{
  "success": true,
  "data": {
    "_id": "665c...",
    "title": "Senior React Developer",
    "description": "<p>We are looking for a Senior React Developer...</p>",
    "requiredSkills": ["react", "typescript", "node.js"],
    "niceToHaveSkills": ["graphql", "docker"],
    "location": "Bangalore",
    "jobType": "full-time",
    "experienceLevel": "senior",
    "salaryMin": 80000,
    "salaryMax": 150000,
    "isSalaryDisclosed": true,
    "openingsCount": 3,
    "applicationDeadline": "2026-04-30T00:00:00Z",
    "status": "active",
    "company": {
      "name": "TechCorp",
      "logoUrl": "https://...",
      "industry": "IT",
      "companySize": "201-1000"
    },
    "aiMatchBreakdown": {  // Only if authenticated
      "overallScore": 87,
      "matchedSkills": ["react", "typescript"],
      "missingSkills": ["node.js"],
      "recommendation": "Good Match"
    },
    "viewsCount": 124,
    "createdAt": "2026-03-20T10:00:00Z"
  }
}
```

---

## 3. GET `/api/v1/user/recommended-jobs`

| Property | Value |
|----------|-------|
| **Purpose** | Get top 10 AI-recommended jobs for the logged-in user |
| **Auth Required** | ✅ Bearer JWT (user) |
| **Collections** | `jobs` (active) + `resumes` (primary, AI skills) |
| **Algorithm** | Compare `resumes.aiSkills` with `jobs.requiredSkills` → rank by overlap |

**Response (200):**
```json
{
  "success": true,
  "data": [
    { "_id": "665c...", "title": "React Developer", "aiMatchScore": 92, "company": "..." },
    { "_id": "665d...", "title": "Full Stack Dev", "aiMatchScore": 85, "company": "..." }
  ]
}
```

**How it connects:**
- Requires user to have at least one resume with `aiParseStatus: "analyzed"`.
- Displayed as "Recommended for You" section above the job listings on `/dashboard/jobs`.
- Falls back to keyword matching if AI analysis is not yet complete.

---

## 🔗 Relationship Chain

```
GET /jobs (public list)
  └── Uses jobs.status = "active"
  └── If authenticated, fetches resumes.aiSkills for match score

GET /jobs/:id (single job detail)
  └── Populates recruiter_profiles via jobs.recruiterId → users._id → recruiter_profiles.user
  └── Increments jobs.viewsCount

GET /user/recommended-jobs
  └── resumes (primary) → aiSkills
  └── jobs (active) → requiredSkills
  └── Rank by skills overlap → return top 10
```
