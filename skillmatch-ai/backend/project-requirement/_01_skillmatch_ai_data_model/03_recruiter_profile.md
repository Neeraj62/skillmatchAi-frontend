# 📄 Collection: `recruiter_profiles`

> **Purpose:** Extended profile for Recruiters (role = "recruiter"). Contains company-level information. Linked 1:1 with `users` collection. A recruiter must set up their company profile before posting jobs.

---

## Mongoose Schema

```javascript
import mongoose from "mongoose";

const recruiterProfileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
      index: true,
    },
    companyName: {
      type: String,
      required: [true, "Company name is required"],
      trim: true,
      maxlength: [200, "Company name cannot exceed 200 characters"],
    },
    companyLogoUrl: {
      type: String, // Cloudinary / S3 URL
      trim: true,
    },
    companySize: {
      type: String,
      enum: ["1-10", "11-50", "51-200", "201-1000", "1000+"],
    },
    industry: {
      type: String,
      trim: true,
      // e.g., "Information Technology", "Healthcare", "Finance"
    },
    companyWebsite: {
      type: String,
      trim: true,
    },
    companyDescription: {
      type: String,
      trim: true,
      maxlength: [3000, "Company description cannot exceed 3000 characters"],
    },
    location: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const RecruiterProfile = mongoose.model("RecruiterProfile", recruiterProfileSchema);
export default RecruiterProfile;
```

---

## Field Reference

| Field | Type | Required | Default | Description |
|-------|------|----------|---------|-------------|
| `_id` | ObjectId | Auto | Auto | Primary key |
| `user` | ObjectId (ref: User) | ✅ | — | Reference to `users._id` (unique, 1:1) |
| `companyName` | String | ✅ | — | Name of the company |
| `companyLogoUrl` | String | No | — | Company logo image URL |
| `companySize` | String (enum) | No | — | Employee count range |
| `industry` | String | No | — | Industry sector |
| `companyWebsite` | String | No | — | Company website URL |
| `companyDescription` | String | No | — | About the company |
| `location` | String | No | — | Company HQ location |
| `createdAt` | Date | Auto | Auto | Timestamp |
| `updatedAt` | Date | Auto | Auto | Timestamp |

---

## 🔗 Relationships

| Direction | Related Collection | Type | FK Field |
|-----------|--------------------|------|----------|
| ⬆️ Parent | `users` | One-to-One | `this.user → users._id` |
| ⬇️ Child | `jobs` | One-to-Many | `jobs.recruiterId → users._id` (the same user ref) |

---

## 📌 Notes

- Only users with `role: "recruiter"` should have a `recruiter_profile` document.
- `companyLogoUrl` is uploaded via multipart/form-data and stored on Cloudinary/S3.
- Jobs are linked to the recruiter via `jobs.recruiterId → users._id`, not through this profile `_id`. This keeps queries simpler.
