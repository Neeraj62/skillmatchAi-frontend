# 📄 Collection: `candidate_educations`

> **Purpose:** Stores education history for a candidate. Each entry represents one educational qualification (degree). Linked to `candidate_profiles` via ObjectId reference.

---

## Mongoose Schema

```javascript
import mongoose from "mongoose";

const candidateEducationSchema = new mongoose.Schema(
  {
    candidateProfile: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CandidateProfile",
      required: true,
      index: true,
    },
    degree: {
      type: String,
      required: [true, "Degree is required"],
      trim: true,
      // e.g., "B.Tech", "MBA", "M.Sc"
    },
    institution: {
      type: String,
      required: [true, "Institution name is required"],
      trim: true,
    },
    fieldOfStudy: {
      type: String,
      trim: true,
      // e.g., "Computer Science", "Business Administration"
    },
    startYear: {
      type: Number,
      min: 1950,
      max: 2030,
    },
    endYear: {
      type: Number,
      min: 1950,
      max: 2035,
    },
    grade: {
      type: String,
      trim: true,
      // e.g., "8.5 CGPA", "First Class", "85%"
    },
  },
  {
    timestamps: true,
  }
);

const CandidateEducation = mongoose.model("CandidateEducation", candidateEducationSchema);
export default CandidateEducation;
```

---

## Field Reference

| Field | Type | Required | Default | Description |
|-------|------|----------|---------|-------------|
| `_id` | ObjectId | Auto | Auto | Primary key |
| `candidateProfile` | ObjectId (ref: CandidateProfile) | ✅ | — | Parent candidate profile |
| `degree` | String | ✅ | — | Degree title (B.Tech, MBA, etc.) |
| `institution` | String | ✅ | — | University / College name |
| `fieldOfStudy` | String | No | — | Major / Specialization |
| `startYear` | Number | No | — | Year of admission |
| `endYear` | Number | No | — | Year of completion |
| `grade` | String | No | — | Grade / CGPA / Percentage |
| `createdAt` | Date | Auto | Auto | Timestamp |
| `updatedAt` | Date | Auto | Auto | Timestamp |

---

## 🔗 Relationships

| Direction | Related Collection | Type | FK Field |
|-----------|--------------------|------|----------|
| ⬆️ Parent | `candidate_profiles` | Many-to-One | `this.candidateProfile → candidate_profiles._id` |

---

## 📌 Notes

- A candidate can have multiple education entries (e.g., B.Tech + MBA).
- The AI resume parser (MVP5) also extracts education and can auto-populate this collection.
