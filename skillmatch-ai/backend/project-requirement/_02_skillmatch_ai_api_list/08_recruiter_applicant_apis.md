# 👥 Recruiter Applicant Pipeline APIs

> **Module:** Recruiter Dashboard — View, Filter, Shortlist, Reject Candidates
> **Base Route:** `/api/v1/recruiter`
> **Auth Required:** ✅ Bearer JWT (role: `recruiter`)
> **Purpose:** Manage the candidate pipeline for each job — the core recruiter workflow.

---

## 1. GET `/api/v1/recruiter/jobs/:jobId/applicants`

| Purpose | List all applicants for a specific job |
|---------|---------------------------------------|
| Collections | `applications` (find by `{ job: jobId }`) |
| Populate | `.populate("user", "name email")` + `.populate("resume", "aiSkills")` |
| Query Params | `status`, `min_score`, `sort` (match_score / applied_at / name), `page`, `limit` |

**Response (200):**
```json
{
  "success": true,
  "data": {
    "applicants": [
      {
        "_id": "665e...",
        "user": { "_id": "665a...", "name": "Ashutosh Kumar", "email": "ashutosh@example.com" },
        "aiMatchScore": 87,
        "status": "applied",
        "rank": 1,
        "appliedAt": "2026-03-25T10:00:00Z"
      }
    ],
    "summary": { "total": 42, "applied": 22, "screening": 8, "shortlisted": 8, "rejected": 4 }
  }
}
```

**How it connects:**
- The `job` ObjectId filters applications for this specific job.
- Populated `user` info shows candidate name/email.
- `aiMatchScore` comes from the AI engine (MVP5) — stored on the `applications` document.
- `rank` is computed by sorting all applicants by `aiMatchScore DESC`.

---

## 2. GET `/api/v1/recruiter/jobs/:jobId/applicants/:applicationId`

| Purpose | Get full detail of a single applicant |
|---------|--------------------------------------|
| Collections | `applications` (by `_id`) + `candidate_profiles` + `resumes` |
| Populate | Full candidate profile, resume, AI breakdown, notes, status history |

**Response includes:**
- Candidate avatar, name, headline, contact, skills, experience, education
- Resume download URL
- AI Match Score breakdown (matched/missing skills, strengths, gaps)
- Status history timeline
- Recruiter notes

---

## 3. PATCH `/api/v1/recruiter/jobs/:jobId/applicants/:applicationId/status`

| Purpose | Update application status (shortlist, reject, move to interview) |
|---------|----------------------------------------------------------------|
| Collections | `applications` (update `status` field + push to `statusHistory`) |
| Valid Transitions | `applied → screening → shortlisted / rejected`, `shortlisted → interview → offered / rejected` |
| Side Effects | Sends email notification to candidate • Creates in-app notification |

**Request Body:**
```json
{ "status": "shortlisted" }
```

**How it connects:**
- Updates `applications.status` field
- Pushes new entry to `applications.statusHistory` array with `changedBy: req.user.id`
- Triggers email to candidate via Bull email queue
- Creates `notifications` document for the candidate

---

## 4. POST `/api/v1/recruiter/jobs/:jobId/applicants/bulk-update`

| Purpose | Bulk update status for multiple applicants |
|---------|------------------------------------------|
| Collections | `applications` (updateMany) |
| Use Case | Bulk shortlist or bulk reject from the applicant pipeline table |

**Request Body:**
```json
{
  "applicationIds": ["665e1...", "665e2...", "665e3..."],
  "status": "shortlisted"
}
```

---

## 5. GET `/api/v1/recruiter/shortlisted`

| Purpose | Get all shortlisted candidates across ALL jobs |
|---------|------------------------------------------------|
| Collections | `applications` (find by `{ status: "shortlisted" }` + recruiter's jobs) |
| Populate | Job title, candidate name, match score |
| Use Case | Aggregated shortlist view on `/recruiter/shortlisted` page |

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "job": { "_id": "665c...", "title": "Senior React Developer" },
      "candidates": [
        { "name": "Ashutosh Kumar", "email": "...", "aiMatchScore": 87 },
        { "name": "Priya Sharma", "email": "...", "aiMatchScore": 82 }
      ]
    }
  ]
}
```

---

## 6. POST `/api/v1/recruiter/jobs/:jobId/applicants/:applicationId/notes`

| Purpose | Add a recruiter note to an application |
|---------|---------------------------------------|
| Collections | `applications` (push to `recruiterNotes` array) |

**Request Body:**
```json
{ "note": "Strong candidate, schedule for technical round next week." }
```

---

## 7. GET `/api/v1/recruiter/jobs/:jobId/applicants/export`

| Purpose | Export applicant list as CSV |
|---------|----------------------------|
| Collections | `applications` + `users` |
| Returns | CSV file with columns: Name, Email, Match Score, Status, Applied Date |
| Headers | `Content-Type: text/csv`, `Content-Disposition: attachment; filename=applicants.csv` |

---

## 🔗 Recruiter Pipeline Flow

```
GET /recruiter/jobs/:jobId/applicants (view all applicants)
  ├── Sorted by aiMatchScore DESC (from AI engine)
  ├── Filter by status tabs: Applied | Screening | Shortlisted | Rejected
  └── For each applicant:
      ├── GET .../applicants/:id (view full detail + AI breakdown)
      ├── PATCH .../applicants/:id/status (change status → triggers email)
      └── POST .../applicants/:id/notes (add recruiter note)
  └── Bulk:
      └── POST .../applicants/bulk-update (mass shortlist/reject)

GET /recruiter/shortlisted (aggregate view across all jobs)
  └── Group by job title → list shortlisted candidates
  └── Export CSV via GET .../export
```
