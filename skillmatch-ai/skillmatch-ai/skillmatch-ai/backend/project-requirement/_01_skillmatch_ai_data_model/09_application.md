# 📄 Collection: `applications`

> **Purpose:** Links Job Seekers to Jobs. Created when a user clicks "Apply Now" for a specific job. The AI Match Score is computed asynchronously and stored here. Recruiters manage the applicant pipeline through this collection's `status` field.

---

## Mongoose Schema

```javascript
import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: true,
      index: true,
    },
    resume: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Resume",
      required: true,
    },
    coverLetter: {
      type: String,
      trim: true,
      maxlength: [3000, "Cover letter cannot exceed 3000 characters"],
    },
    status: {
      type: String,
      enum: ["applied", "screening", "shortlisted", "interview", "offered", "rejected"],
      default: "applied",
    },
    // ─── AI Match Score (computed async by Bull queue) ───
    aiMatchScore: {
      type: Number,
      min: 0,
      max: 100,
      default: null, // null until AI computes it
    },
    aiMatchBreakdown: {
      skillsScore: { type: Number, min: 0, max: 100 },
      experienceScore: { type: Number, min: 0, max: 100 },
      matchedRequiredSkills: { type: [String], default: [] },
      missingRequiredSkills: { type: [String], default: [] },
      matchedNiceToHaveSkills: { type: [String], default: [] },
      strengths: { type: [String], default: [] },
      gaps: { type: [String], default: [] },
      aiRecommendation: {
        type: String,
        enum: ["Strong Match", "Good Match", "Partial Match", "Not Recommended"],
      },
      shortSummary: { type: String },
    },
    rank: {
      type: Number, // Ranking position among all applicants for this job
      default: null,
    },
    recruiterNotes: {
      type: [
        {
          note: { type: String, trim: true },
          addedAt: { type: Date, default: Date.now },
        },
      ],
      default: [],
    },
    statusHistory: {
      type: [
        {
          status: {
            type: String,
            enum: ["applied", "screening", "shortlisted", "interview", "offered", "rejected"],
          },
          changedAt: { type: Date, default: Date.now },
          changedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        },
      ],
      default: [],
    },
    appliedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Prevent duplicate applications: one user can apply only once per job
applicationSchema.index({ user: 1, job: 1 }, { unique: true });

const Application = mongoose.model("Application", applicationSchema);
export default Application;
```

---

## Field Reference

| Field | Type | Required | Default | Description |
|-------|------|----------|---------|-------------|
| `_id` | ObjectId | Auto | Auto | Primary key |
| `user` | ObjectId (ref: User) | ✅ | — | The job seeker who applied |
| `job` | ObjectId (ref: Job) | ✅ | — | The job being applied to |
| `resume` | ObjectId (ref: Resume) | ✅ | — | Resume used for this application |
| `coverLetter` | String | No | — | Optional cover letter text |
| `status` | String (enum) | No | `"applied"` | Pipeline stage |
| `aiMatchScore` | Number | No | `null` | AI-computed match score (0-100) |
| `aiMatchBreakdown` | Object | No | — | Detailed AI analysis (see sub-fields below) |
| `aiMatchBreakdown.skillsScore` | Number | No | — | Weighted skills match score |
| `aiMatchBreakdown.experienceScore` | Number | No | — | Experience relevance score |
| `aiMatchBreakdown.matchedRequiredSkills` | [String] | No | `[]` | Skills candidate HAS from required list |
| `aiMatchBreakdown.missingRequiredSkills` | [String] | No | `[]` | Skills candidate LACKS from required list |
| `aiMatchBreakdown.matchedNiceToHaveSkills` | [String] | No | `[]` | Nice-to-have skills matched |
| `aiMatchBreakdown.strengths` | [String] | No | `[]` | AI-identified strengths |
| `aiMatchBreakdown.gaps` | [String] | No | `[]` | AI-identified gaps |
| `aiMatchBreakdown.aiRecommendation` | String (enum) | No | — | Strong Match / Good Match / etc. |
| `aiMatchBreakdown.shortSummary` | String | No | — | One-liner AI recommendation |
| `rank` | Number | No | `null` | Position in ranked applicant list |
| `recruiterNotes` | [Object] | No | `[]` | Notes added by recruiter |
| `statusHistory` | [Object] | No | `[]` | Timeline of status changes |
| `appliedAt` | Date | No | `Date.now` | When application was submitted |
| `createdAt` | Date | Auto | Auto | Timestamp |
| `updatedAt` | Date | Auto | Auto | Timestamp |

---

## 🔗 Relationships

| Direction | Related Collection | Type | FK Field |
|-----------|--------------------|------|----------|
| ⬆️ Parent | `users` (job seeker) | Many-to-One | `this.user → users._id` |
| ⬆️ Parent | `jobs` | Many-to-One | `this.job → jobs._id` |
| ⬆️ Parent | `resumes` | Many-to-One | `this.resume → resumes._id` |
| ⬆️ StatusChangedBy | `users` (recruiter) | Ref | `statusHistory[].changedBy → users._id` |

---

## 📌 Notes

- **Unique constraint:** `{ user, job }` = one application per user per job posting.
- **Status transitions:** `applied → screening → shortlisted / rejected`, `shortlisted → interview → offered / rejected`.
- **AI Match Score** is `null` initially and populated by the Bull queue worker after application.
- `recruiterNotes` is an embedded array so notes live with the application (no separate collection needed).
- `statusHistory` tracks every status change with who changed it and when — useful for the timeline view.
