# 📄 Resume Management APIs

> **Module:** User Dashboard — Resume Upload & AI Analysis
> **Base Route:** `/api/v1/user/resumes`
> **Auth Required:** ✅ Bearer JWT (role: `user`)
> **Purpose:** Upload, list, delete resumes. AI parsing is triggered automatically on upload via Bull queue.

---

## 1. POST `/api/v1/user/resumes`

| Property | Value |
|----------|-------|
| **Purpose** | Upload a new resume (PDF/DOCX) |
| **Auth** | ✅ Bearer JWT (user) |
| **Collections** | `resumes` (creates new doc with `user: req.user.id`) |
| **ObjectId Link** | `resumes.user → users._id` |
| **File Handling** | `multer` → validate type (pdf/docx) + size (≤5MB) → Cloudinary upload |
| **Async Trigger** | Adds job to `resumeQueue` (Bull) → triggers AI parsing |

**Request:** `multipart/form-data` with field `resume` (file)

**Response (201):**
```json
{
  "success": true,
  "message": "Resume uploaded. AI analysis in progress.",
  "data": {
    "_id": "665b...",
    "user": "665a...",
    "filename": "ashutosh_resume.pdf",
    "fileUrl": "https://res.cloudinary.com/.../ashutosh_resume.pdf",
    "fileSize": 245760,
    "fileType": "pdf",
    "aiParseStatus": "pending",
    "isPrimary": false
  }
}
```

**How it connects:**
1. File uploaded → saved to Cloudinary → URL stored in `resumes.fileUrl`
2. Bull queue job added: `{ resumeId: "665b..." }`
3. Queue worker downloads file → extracts text (pdf-parse/mammoth)
4. Text sent to OpenAI GPT-4o-mini → returns skills, summary, education
5. Results saved to `resumes.aiSkills`, `resumes.aiSummary`, `resumes.aiParseStatus = "analyzed"`
6. Match scores computed for all active jobs → saved to `applications` (if any exist)
7. Cost logged to `ai_usage_logs`

---

## 2. GET `/api/v1/user/resumes`

| Property | Value |
|----------|-------|
| **Purpose** | List all uploaded resumes for the logged-in user |
| **Collections** | `resumes` (find by `{ user: req.user.id }`) |
| **Related APIs** | Displayed in `/dashboard/resume` page |

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "_id": "665b...",
      "filename": "ashutosh_resume.pdf",
      "fileUrl": "https://...",
      "fileSize": 245760,
      "aiParseStatus": "analyzed",
      "isPrimary": true,
      "createdAt": "2026-03-17T10:00:00Z"
    }
  ]
}
```

---

## 3. DELETE `/api/v1/user/resumes/:id`

| Property | Value |
|----------|-------|
| **Purpose** | Delete an uploaded resume |
| **Collections** | `resumes` (delete by `_id`) + delete from Cloudinary |
| **Validation** | Cannot delete if it's the only primary resume used in active applications |

---

## 4. PUT `/api/v1/user/resumes/:id/set-primary`

| Property | Value |
|----------|-------|
| **Purpose** | Set a resume as the primary resume |
| **Collections** | `resumes` (set `isPrimary: true`, unset others) |
| **Related APIs** | The primary resume is auto-selected when applying to jobs |

---

## 5. GET `/api/v1/user/resumes/:id/analysis`

| Property | Value |
|----------|-------|
| **Purpose** | Return AI analysis results for a specific resume |
| **Collections** | `resumes` (read AI fields) |
| **Related APIs** | Displayed in the "AI Analysis" panel on `/dashboard/resume` |

**Response (200):**
```json
{
  "success": true,
  "data": {
    "aiParseStatus": "analyzed",
    "aiSkills": ["javascript", "react", "node.js", "mongodb", "express"],
    "aiSummary": "Full-stack developer with 3 years of MERN stack experience...",
    "aiEducation": [
      { "degree": "B.Tech in CSE", "institution": "IIT Delhi", "year": "2020-2024" }
    ],
    "aiExperience": [
      { "title": "Frontend Developer", "company": "TCS", "duration": "2 years" }
    ]
  }
}
```

---

## 🔗 Resume → AI Pipeline Flow

```
POST /user/resumes (upload)
  ├── File → Cloudinary (storage)
  ├── Metadata → resumes collection (MongoDB)
  └── Job → resumeQueue (Bull + Redis)
      └── Queue Worker:
          ├── Download file from Cloudinary
          ├── Extract text (pdf-parse / mammoth)
          ├── Send to OpenAI GPT-4o-mini
          ├── Parse JSON response
          ├── Update resumes doc (aiSkills, aiSummary, aiParseStatus)
          ├── Log cost to ai_usage_logs
          └── Trigger matchQueue for active jobs
              └── Compute match score per job → save to applications
```
