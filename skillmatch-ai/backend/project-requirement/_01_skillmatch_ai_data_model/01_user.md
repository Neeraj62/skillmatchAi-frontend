# 📄 Collection: `users`

> **Purpose:** Core authentication collection. Every person (Job Seeker or Recruiter) must have a `User` document before they can do anything on the platform. This is the root of all ObjectId relationships.

---

## Mongoose Schema

```javascript
import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: [2, "Name must be at least 2 characters"],
      maxlength: [100, "Name cannot exceed 100 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please provide a valid email address"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be at least 8 characters"],
      select: false, // Never returned in queries by default
    },
    role: {
      type: String,
      enum: {
        values: ["user", "recruiter"],
        message: "Role must be either 'user' or 'recruiter'",
      },
      default: "user",
      required: true,
    },
    phone: {
      type: String,
      trim: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    refreshToken: {
      type: String,
      select: false, // Security: never expose refresh token
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt automatically
  }
);

// ─── Pre-save Hook: Hash password before saving ───
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// ─── Instance Method: Compare password ───
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model("User", userSchema);
export default User;
```

---

## Field Reference

| Field | Type | Required | Unique | Default | Description |
|-------|------|----------|--------|---------|-------------|
| `_id` | ObjectId | Auto | Yes | Auto-generated | MongoDB primary key |
| `name` | String | ✅ | No | — | Full name of user |
| `email` | String | ✅ | ✅ | — | Login email (lowercase, trimmed) |
| `password` | String | ✅ | No | — | Hashed password (bcrypt, salt 12) |
| `role` | String (enum) | ✅ | No | `"user"` | `"user"` = Job Seeker, `"recruiter"` = Recruiter |
| `phone` | String | No | No | — | Optional phone number |
| `isVerified` | Boolean | No | No | `false` | Email verification status |
| `refreshToken` | String | No | No | — | JWT refresh token (select: false) |
| `createdAt` | Date | Auto | No | Auto | Timestamp |
| `updatedAt` | Date | Auto | No | Auto | Timestamp |

---

## 🔗 Relationships (as Parent)

| This Collection | Related Collection | Type | FK Field in Related |
|----------------|-------------------|------|---------------------|
| `users._id` → | `candidate_profiles.user` | One-to-One | `user` (ObjectId ref: "User") |
| `users._id` → | `recruiter_profiles.user` | One-to-One | `user` (ObjectId ref: "User") |
| `users._id` → | `resumes.user` | One-to-Many | `user` (ObjectId ref: "User") |
| `users._id` → | `applications.user` | One-to-Many | `user` (ObjectId ref: "User") |
| `users._id` → | `notifications.user` | One-to-Many | `user` (ObjectId ref: "User") |
| `users._id` → | `ai_usage_logs.user` | One-to-Many | `user` (ObjectId ref: "User") |
| `users._id` → | `jobs.recruiterId` | One-to-Many | `recruiterId` (ObjectId ref: "User") |

---

## 📌 Notes

- The `password` field uses `select: false` — you must explicitly `.select("+password")` when verifying login.
- The `role` determines which profile collection gets created: `user` → `candidate_profiles`, `recruiter` → `recruiter_profiles`.
- `refreshToken` is stored in DB for token rotation / invalidation on logout.
