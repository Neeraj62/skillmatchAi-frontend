# 📄 Collection: `candidate_experiences`

> **Purpose:** Stores work experience history for a candidate. Each entry represents one job/role the candidate has held. Linked to `candidate_profiles` via ObjectId reference.

---

## Mongoose Schema

```javascript
import mongoose from "mongoose";

const candidateExperienceSchema = new mongoose.Schema(
  {
    candidateProfile: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CandidateProfile",
      required: true,
      index: true,
    },
    jobTitle: {
      type: String,
      required: [true, "Job title is required"],
      trim: true,
    },
    company: {
      type: String,
      required: [true, "Company name is required"],
      trim: true,
    },
    startDate: {
      type: Date,
      required: [true, "Start date is required"],
    },
    endDate: {
      type: Date,
      // null if currently working here
    },
    isCurrent: {
      type: Boolean,
      default: false,
    },
    description: {
      type: String,
      trim: true,
      maxlength: [2000, "Description cannot exceed 2000 characters"],
      // Responsibilities, achievements, etc.
    },
  },
  {
    timestamps: true,
  }
);

const CandidateExperience = mongoose.model("CandidateExperience", candidateExperienceSchema);
export default CandidateExperience;
```

---

## Field Reference

| Field | Type | Required | Default | Description |
|-------|------|----------|---------|-------------|
| `_id` | ObjectId | Auto | Auto | Primary key |
| `candidateProfile` | ObjectId (ref: CandidateProfile) | ✅ | — | Parent candidate profile |
| `jobTitle` | String | ✅ | — | Role / Position title |
| `company` | String | ✅ | — | Employer company name |
| `startDate` | Date | ✅ | — | Role start date |
| `endDate` | Date | No | — | Role end date (null if current) |
| `isCurrent` | Boolean | No | `false` | Whether currently working here |
| `description` | String | No | — | Job responsibilities & achievements |
| `createdAt` | Date | Auto | Auto | Timestamp |
| `updatedAt` | Date | Auto | Auto | Timestamp |

---

## 🔗 Relationships

| Direction | Related Collection | Type | FK Field |
|-----------|--------------------|------|----------|
| ⬆️ Parent | `candidate_profiles` | Many-to-One | `this.candidateProfile → candidate_profiles._id` |

---

## 📌 Notes

- If `isCurrent` is `true`, `endDate` should be `null`.
- Total years of experience on `candidate_profiles.yearsOfExperience` is computed from sum of experience entries.
- The AI resume parser (MVP5) extracts work experience and can auto-populate this collection.
