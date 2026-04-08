# 📄 Collection: `candidate_skills`

> **Purpose:** Stores individual skills for a candidate profile with proficiency level. This is a separate collection (not embedded array) to allow CRUD operations and querying across all candidates by skill.

---

## Mongoose Schema

```javascript
import mongoose from "mongoose";

const candidateSkillSchema = new mongoose.Schema(
  {
    candidateProfile: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CandidateProfile",
      required: true,
      index: true,
    },
    skillName: {
      type: String,
      required: [true, "Skill name is required"],
      trim: true,
      lowercase: true,
    },
    proficiencyLevel: {
      type: String,
      enum: {
        values: ["beginner", "intermediate", "expert"],
        message: "Proficiency must be beginner, intermediate, or expert",
      },
      default: "intermediate",
    },
  },
  {
    timestamps: true,
  }
);

// Compound index: one skill per candidate profile (no duplicates)
candidateSkillSchema.index({ candidateProfile: 1, skillName: 1 }, { unique: true });

const CandidateSkill = mongoose.model("CandidateSkill", candidateSkillSchema);
export default CandidateSkill;
```

---

## Field Reference

| Field | Type | Required | Default | Description |
|-------|------|----------|---------|-------------|
| `_id` | ObjectId | Auto | Auto | Primary key |
| `candidateProfile` | ObjectId (ref: CandidateProfile) | ✅ | — | Parent candidate profile |
| `skillName` | String | ✅ | — | Skill name (lowercase, e.g., "javascript") |
| `proficiencyLevel` | String (enum) | No | `"intermediate"` | beginner / intermediate / expert |
| `createdAt` | Date | Auto | Auto | Timestamp |
| `updatedAt` | Date | Auto | Auto | Timestamp |

---

## 🔗 Relationships

| Direction | Related Collection | Type | FK Field |
|-----------|--------------------|------|----------|
| ⬆️ Parent | `candidate_profiles` | Many-to-One | `this.candidateProfile → candidate_profiles._id` |

---

## 📌 Notes

- Compound unique index on `{ candidateProfile, skillName }` prevents duplicate skills.
- Skills are stored in lowercase for consistent matching with the AI engine.
- These skills are used by the AI Match Score engine (MVP5) as `candidate_skills` input.
