# 📄 Collection: `candidate_profiles`

> **Purpose:** Extended profile for Job Seekers (role = "user"). Created when a job seeker fills out their profile for the first time. Linked 1:1 with `users` collection via `user` ObjectId reference.

---

## Mongoose Schema

```javascript
import mongoose from "mongoose";

const candidateProfileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true, // One profile per user
      index: true,
    },
    headline: {
      type: String,
      trim: true,
      maxlength: [200, "Headline cannot exceed 200 characters"],
      // e.g., "Frontend Developer | 3 Years Exp"
    },
    summary: {
      type: String,
      trim: true,
      maxlength: [2000, "Summary cannot exceed 2000 characters"],
    },
    location: {
      city: { type: String, trim: true },
      country: { type: String, trim: true },
    },
    phone: {
      type: String,
      trim: true,
    },
    linkedinUrl: {
      type: String,
      trim: true,
    },
    githubUrl: {
      type: String,
      trim: true,
    },
    portfolioUrl: {
      type: String,
      trim: true,
    },
    yearsOfExperience: {
      type: Number,
      min: 0,
      max: 50,
      default: 0,
    },
    currentSalary: {
      type: Number, // Monthly in INR
      min: 0,
    },
    expectedSalary: {
      type: Number, // Monthly in INR
      min: 0,
    },
    noticePeriod: {
      type: Number, // In days
      min: 0,
      default: 0,
    },
    avatarUrl: {
      type: String, // Cloudinary / S3 URL
      trim: true,
    },
    profileCompletionPercentage: {
      type: Number,
      min: 0,
      max: 100,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const CandidateProfile = mongoose.model("CandidateProfile", candidateProfileSchema);
export default CandidateProfile;
```

---

## Field Reference

| Field | Type | Required | Default | Description |
|-------|------|----------|---------|-------------|
| `_id` | ObjectId | Auto | Auto | Primary key |
| `user` | ObjectId (ref: User) | ✅ | — | Reference to `users._id` (unique, 1:1) |
| `headline` | String | No | — | Short professional headline |
| `summary` | String | No | — | Bio / about text |
| `location.city` | String | No | — | City |
| `location.country` | String | No | — | Country |
| `phone` | String | No | — | Contact phone |
| `linkedinUrl` | String | No | — | LinkedIn profile URL |
| `githubUrl` | String | No | — | GitHub profile URL |
| `portfolioUrl` | String | No | — | Portfolio website URL |
| `yearsOfExperience` | Number | No | `0` | Total years of experience |
| `currentSalary` | Number | No | — | Current monthly salary (INR) |
| `expectedSalary` | Number | No | — | Expected monthly salary (INR) |
| `noticePeriod` | Number | No | `0` | Notice period in days |
| `avatarUrl` | String | No | — | Profile picture URL (Cloudinary) |
| `profileCompletionPercentage` | Number | No | `0` | Computed % of filled fields |
| `createdAt` | Date | Auto | Auto | Timestamp |
| `updatedAt` | Date | Auto | Auto | Timestamp |

---

## 🔗 Relationships

| Direction | Related Collection | Type | FK Field |
|-----------|--------------------|------|----------|
| ⬆️ Parent | `users` | One-to-One | `this.user → users._id` |
| ⬇️ Child | `candidate_skills` | One-to-Many | `candidate_skills.candidateProfile → this._id` |
| ⬇️ Child | `candidate_educations` | One-to-Many | `candidate_educations.candidateProfile → this._id` |
| ⬇️ Child | `candidate_experiences` | One-to-Many | `candidate_experiences.candidateProfile → this._id` |

---

## 📌 Notes

- Only users with `role: "user"` should have a `candidate_profile` document.
- The `profileCompletionPercentage` is computed on the backend whenever profile is updated.
- `location` is embedded as a sub-document (not a separate collection) for query efficiency.
