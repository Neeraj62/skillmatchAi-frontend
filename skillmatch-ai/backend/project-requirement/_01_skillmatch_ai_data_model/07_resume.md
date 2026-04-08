# 📄 Collection: `resumes`

> **Purpose:** Stores uploaded resume metadata and AI-parsed analysis results. Each resume file (PDF/DOCX) is stored on Cloudinary/S3, and this collection holds the URL + all AI-extracted data. A user can upload multiple resumes but must set one as "primary".

---

## Mongoose Schema

```javascript
import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    filename: {
      type: String,
      required: [true, "Filename is required"],
      trim: true,
    },
    fileUrl: {
      type: String,
      required: [true, "File URL is required"],
      trim: true,
      // Cloudinary or S3 signed URL
    },
    fileSize: {
      type: Number, // in bytes
      required: true,
      max: [5 * 1024 * 1024, "File size cannot exceed 5MB"], // 5MB limit
    },
    fileType: {
      type: String,
      enum: ["pdf", "docx"],
      required: true,
    },
    // ─── AI-Extracted Fields (populated after async processing) ───
    aiExtractedText: {
      type: String, // Full raw text extracted from resume
    },
    aiSkills: {
      type: [String], // Array of extracted skill strings
      default: [],
    },
    aiSummary: {
      type: String, // AI-generated candidate summary
    },
    aiEducation: {
      type: [
        {
          degree: String,
          institution: String,
          year: String,
        },
      ],
      default: [],
    },
    aiExperience: {
      type: [
        {
          title: String,
          company: String,
          duration: String,
        },
      ],
      default: [],
    },
    aiParseStatus: {
      type: String,
      enum: ["pending", "processing", "analyzed", "failed"],
      default: "pending",
    },
    isPrimary: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Ensure only one primary resume per user
resumeSchema.pre("save", async function (next) {
  if (this.isPrimary) {
    await this.constructor.updateMany(
      { user: this.user, _id: { $ne: this._id } },
      { isPrimary: false }
    );
  }
  next();
});

const Resume = mongoose.model("Resume", resumeSchema);
export default Resume;
```

---

## Field Reference

| Field | Type | Required | Default | Description |
|-------|------|----------|---------|-------------|
| `_id` | ObjectId | Auto | Auto | Primary key |
| `user` | ObjectId (ref: User) | ✅ | — | Owner of the resume |
| `filename` | String | ✅ | — | Original upload filename |
| `fileUrl` | String | ✅ | — | Cloud storage URL (Cloudinary/S3) |
| `fileSize` | Number | ✅ | — | File size in bytes (max 5MB) |
| `fileType` | String (enum) | ✅ | — | `"pdf"` or `"docx"` |
| `aiExtractedText` | String | No | — | Full raw text from PDF/DOCX |
| `aiSkills` | [String] | No | `[]` | AI-extracted skill names |
| `aiSummary` | String | No | — | AI-generated profile summary |
| `aiEducation` | [Object] | No | `[]` | AI-parsed education entries |
| `aiExperience` | [Object] | No | `[]` | AI-parsed experience entries |
| `aiParseStatus` | String (enum) | No | `"pending"` | pending → processing → analyzed / failed |
| `isPrimary` | Boolean | No | `false` | Whether this is the primary resume |
| `createdAt` | Date | Auto | Auto | Upload timestamp |
| `updatedAt` | Date | Auto | Auto | Last updated |

---

## 🔗 Relationships

| Direction | Related Collection | Type | FK Field |
|-----------|--------------------|------|----------|
| ⬆️ Parent | `users` | Many-to-One | `this.user → users._id` |
| ⬇️ Linked | `applications` | One-to-Many | `applications.resume → this._id` |

---

## 📌 Notes

- The pre-save hook ensures only one resume can be `isPrimary: true` per user.
- AI fields are populated asynchronously via Bull queue → OpenAI GPT-4o-mini (MVP5).
- The `aiParseStatus` flow: upload → `pending` → Bull picks up → `processing` → GPT returns → `analyzed` (or `failed`).
- `aiSkills` array is used as input for the AI Match Score engine.
