# 📋 Recruiter Job Management APIs

> **Module:** Recruiter Dashboard — Create, Edit, Publish, Close Jobs
> **Base Route:** `/api/v1/recruiter/jobs`
> **Auth Required:** ✅ Bearer JWT (role: `recruiter`)
> **Purpose:** Full lifecycle management of job postings.

---

## 1. POST `/api/v1/recruiter/jobs`
| Purpose | Create a new job posting |
|---------|-------------------------|
| Collections | `jobs` (creates with `recruiterId: req.user.id`) |
| ObjectId Link | `jobs.recruiterId → users._id` |
| Default | `status: "draft"` |
| Related APIs | Multi-step form in frontend sends final data here |

**Request Body:**
```json
{
  "title": "Senior React Developer",
  "description": "<p>We are looking for...</p>",
  "requiredSkills": ["react", "typescript", "node.js"],
  "niceToHaveSkills": ["graphql", "docker"],
  "location": "Bangalore",
  "jobType": "full-time",
  "experienceLevel": "senior",
  "salaryMin": 80000,
  "salaryMax": 150000,
  "isSalaryDisclosed": true,
  "openingsCount": 3,
  "applicationDeadline": "2026-04-30"
}
```

---

## 2. GET `/api/v1/recruiter/jobs`
| Purpose | List all jobs posted by the current recruiter |
|---------|----------------------------------------------|
| Collections | `jobs` (find by `{ recruiterId: req.user.id }`) |
| Query Params | `status`, `page`, `limit`, `sort` (newest / most_applications) |
| Related APIs | Each job links to applicant pipeline via `GET /recruiter/jobs/:id/applicants` |

---

## 3. GET `/api/v1/recruiter/jobs/:id`
| Purpose | Get full detail of a single job posting |
|---------|----------------------------------------|
| Collections | `jobs` (find by `_id`, verify `recruiterId === req.user.id`) |
| Related APIs | Used to pre-fill the edit form |

---

## 4. PUT `/api/v1/recruiter/jobs/:id`
| Purpose | Update job details |
|---------|-------------------|
| Collections | `jobs` (update by `_id`) |
| Validation | Cannot edit `closed` jobs |

---

## 5. PATCH `/api/v1/recruiter/jobs/:id/status`
| Purpose | Change job status (activate, pause, close) |
|---------|------------------------------------------|
| Collections | `jobs` (update `status` field) |
| Valid Transitions | `draft → active`, `active → paused`, `paused → active`, `active → closed` |

**Request Body:**
```json
{ "status": "active" }
```

**How it connects:**
- When status changes to `"active"`, the job becomes visible to all job seekers in `GET /jobs`.
- When status changes to `"closed"`, no new applications are accepted.

---

## 6. DELETE `/api/v1/recruiter/jobs/:id`
| Purpose | Delete a draft job posting |
|---------|--------------------------|
| Collections | `jobs` (delete by `_id`) |
| Validation | Only `status: "draft"` jobs can be deleted (active/closed cannot) |

---

## 7. GET `/api/v1/recruiter/jobs/:id/analytics`
| Purpose | Get analytics overview for a specific job |
|---------|------------------------------------------|
| Collections | `jobs` + `applications` (aggregate) |
| Returns | `totalViews`, `totalApplications`, `shortlistedCount`, `avgMatchScore` |

**Response (200):**
```json
{
  "success": true,
  "data": {
    "totalViews": 234,
    "totalApplications": 42,
    "shortlistedCount": 8,
    "rejectedCount": 12,
    "avgMatchScore": 67.5
  }
}
```

---

## 🔗 Job Lifecycle Flow

```
POST /recruiter/jobs (creates job with status: "draft")
  └── PATCH /recruiter/jobs/:id/status { status: "active" }
      └── Job visible in GET /jobs (public)
          └── Users apply via POST /jobs/:id/apply
              └── Recruiter views via GET /recruiter/jobs/:id/applicants
                  └── PATCH .../applicants/:id/status { status: "shortlisted" }
      └── PATCH /recruiter/jobs/:id/status { status: "closed" }
          └── Job no longer accepts applications
```
