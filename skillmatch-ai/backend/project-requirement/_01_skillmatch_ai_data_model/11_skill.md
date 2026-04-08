# 📄 Collection: `skills`

> **Purpose:** Master skills dictionary for normalization. Maps skill aliases to canonical names (e.g., "js" → "JavaScript"). Used by the AI match engine to prevent false negatives (e.g., candidate has "React.js" but job requires "ReactJS" — both should match).

---

## Mongoose Schema

```javascript
import mongoose from "mongoose";

const skillSchema = new mongoose.Schema(
  {
    skillName: {
      type: String,
      required: [true, "Skill name is required"],
      unique: true,
      trim: true,
      lowercase: true,
      // Canonical name: "javascript", "react", "mongodb"
    },
    displayName: {
      type: String,
      required: true,
      trim: true,
      // Human-readable: "JavaScript", "React", "MongoDB"
    },
    aliases: {
      type: [String],
      default: [],
      // e.g., ["js", "ecmascript", "es6", "es2015"]
    },
    category: {
      type: String,
      trim: true,
      // e.g., "Programming Language", "Framework", "Database", "DevOps", "Soft Skill"
    },
  },
  {
    timestamps: true,
  }
);

// Text index for autocomplete search
skillSchema.index({ skillName: "text", aliases: "text", displayName: "text" });

const Skill = mongoose.model("Skill", skillSchema);
export default Skill;
```

---

## Field Reference

| Field | Type | Required | Unique | Default | Description |
|-------|------|----------|--------|---------|-------------|
| `_id` | ObjectId | Auto | Yes | Auto | Primary key |
| `skillName` | String | ✅ | ✅ | — | Canonical lowercase skill name |
| `displayName` | String | ✅ | No | — | Human-readable display name |
| `aliases` | [String] | No | No | `[]` | Alternative names/abbreviations |
| `category` | String | No | No | — | Skill category for grouping |
| `createdAt` | Date | Auto | No | Auto | Timestamp |
| `updatedAt` | Date | Auto | No | Auto | Timestamp |

---

## 🔗 Relationships

This is a **standalone lookup collection**. It does not have direct ObjectId references to/from other collections. It's used programmatically by:

- **AI Match Engine** — to normalize skill strings before comparison.
- **Frontend Autocomplete** — `GET /api/skills?q=jav` returns matching skills.
- **Resume Parser** — maps AI-extracted skills to canonical names.

---

## 📌 Seed Data Example

```javascript
const seedSkills = [
  { skillName: "javascript", displayName: "JavaScript", aliases: ["js", "ecmascript", "es6"], category: "Programming Language" },
  { skillName: "typescript", displayName: "TypeScript", aliases: ["ts"], category: "Programming Language" },
  { skillName: "react", displayName: "React", aliases: ["reactjs", "react.js"], category: "Frontend Framework" },
  { skillName: "node.js", displayName: "Node.js", aliases: ["nodejs", "node"], category: "Runtime" },
  { skillName: "mongodb", displayName: "MongoDB", aliases: ["mongo"], category: "Database" },
  { skillName: "express", displayName: "Express.js", aliases: ["expressjs", "express.js"], category: "Backend Framework" },
  { skillName: "python", displayName: "Python", aliases: ["py", "python3"], category: "Programming Language" },
  { skillName: "machine learning", displayName: "Machine Learning", aliases: ["ml", "deep learning", "dl"], category: "AI/ML" },
  { skillName: "docker", displayName: "Docker", aliases: ["containerization"], category: "DevOps" },
  { skillName: "aws", displayName: "Amazon Web Services", aliases: ["amazon web services"], category: "Cloud" },
];
```
