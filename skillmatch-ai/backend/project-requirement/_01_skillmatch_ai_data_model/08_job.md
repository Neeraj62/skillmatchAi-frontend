# 📄 Collection: `jobs`

> **Purpose:** Job postings created by recruiters. This is the central collection that connects recruiters with job seekers via the `applications` collection. The AI match engine uses `requiredSkills` and `description` to compute match scores.

---

## Mongoose Schema

```javascript
import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    recruiterId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    title: {
      type: String,
      required: [true, "Job title is required"],
      trim: true,
      maxlength: [200, "Title cannot exceed 200 characters"],
    },
    description: {
      type: String,
      required: [true, "Job description is required"],
      trim: true,
      // Supports rich text (HTML from editor)
    },
    requiredSkills: {
      type: [String],
      default: [],
      // e.g., ["javascript", "react", "node.js", "mongodb"]
    },
    niceToHaveSkills: {
      type: [String],
      default: [],
    },
    location: {
      type: String,
      trim: true,
      // e.g., "Bangalore, India" or "Remote"
    },
    jobType: {
      type: String,
      enum: ["full-time", "part-time", "contract", "internship", "remote"],
      required: true,
    },
    experienceLevel: {
      type: String,
      enum: ["entry", "mid", "senior", "lead", "executive"],
      required: true,
    },
    salaryMin: {
      type: Number, // Monthly in INR
      min: 0,
    },
    salaryMax: {
      type: Number, // Monthly in INR
      min: 0,
    },
    salaryCurrency: {
      type: String,
      default: "INR",
    },
    isSalaryDisclosed: {
      type: Boolean,
      default: true,
    },
    openingsCount: {
      type: Number,
      default: 1,
      min: 1,
    },
    applicationDeadline: {
      type: Date,
    },
    status: {
      type: String,
      enum: ["draft", "active", "paused", "closed"],
      default: "draft",
    },
    viewsCount: {
      type: Number,
      default: 0,
    },
    applicationsCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Index for public job search
jobSchema.index({ status: 1, createdAt: -1 });
jobSchema.index({ requiredSkills: 1 });

const Job = mongoose.model("Job", jobSchema);
export default Job;
```

---

## Field Reference

| Field | Type | Required | Default | Description |
|-------|------|----------|---------|-------------|
| `_id` | ObjectId | Auto | Auto | Primary key |
| `recruiterId` | ObjectId (ref: User) | ✅ | — | The recruiter who created this job |
| `title` | String | ✅ | — | Job title |
| `description` | String | ✅ | — | Full job description (HTML) |
| `requiredSkills` | [String] | No | `[]` | Skills mandatory for this role |
| `niceToHaveSkills` | [String] | No | `[]` | Bonus skills (extra weight in AI scoring) |
| `location` | String | No | — | Job location or "Remote" |
| `jobType` | String (enum) | ✅ | — | full-time / part-time / contract / internship / remote |
| `experienceLevel` | String (enum) | ✅ | — | entry / mid / senior / lead / executive |
| `salaryMin` | Number | No | — | Min monthly salary (INR) |
| `salaryMax` | Number | No | — | Max monthly salary (INR) |
| `salaryCurrency` | String | No | `"INR"` | Currency code |
| `isSalaryDisclosed` | Boolean | No | `true` | Show salary on job card? |
| `openingsCount` | Number | No | `1` | Number of positions available |
| `applicationDeadline` | Date | No | — | Last date to apply |
| `status` | String (enum) | No | `"draft"` | draft → active → paused/closed |
| `viewsCount` | Number | No | `0` | How many times job was viewed |
| `applicationsCount` | Number | No | `0` | Total applications received |
| `createdAt` | Date | Auto | Auto | When job was created |
| `updatedAt` | Date | Auto | Auto | Last modified |

---

## 🔗 Relationships

| Direction | Related Collection | Type | FK Field |
|-----------|--------------------|------|----------|
| ⬆️ Parent | `users` (recruiter) | Many-to-One | `this.recruiterId → users._id` |
| ⬇️ Child | `applications` | One-to-Many | `applications.job → this._id` |

---

## 📌 Notes

- Jobs with `status: "active"` are visible to Job Seekers in `/dashboard/jobs`.
- `requiredSkills` and `niceToHaveSkills` feed directly into the AI Match Score engine (MVP5).
- `applicationsCount` is incremented each time a new application is created — can also be computed using aggregation.
- The multi-step job creation form (MVP4) saves as `"draft"` by default and publishes as `"active"`.
