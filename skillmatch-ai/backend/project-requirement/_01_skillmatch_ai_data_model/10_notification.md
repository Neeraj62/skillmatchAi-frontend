# 📄 Collection: `notifications`

> **Purpose:** In-app notification system. Stores notifications for both Job Seekers and Recruiters. Used for real-time dashboard updates (e.g., "Your application status changed to Shortlisted", "New applicant for your job post").

---

## Mongoose Schema

```javascript
import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    type: {
      type: String,
      enum: [
        "application_status_change",  // Job seeker: status update
        "new_applicant",              // Recruiter: new application received
        "resume_analyzed",            // Job seeker: AI analysis complete
        "job_recommendation",         // Job seeker: new AI-matched job
        "welcome",                    // Both: welcome message after signup
        "system",                     // Generic system notification
      ],
      required: true,
    },
    title: {
      type: String,
      required: [true, "Notification title is required"],
      trim: true,
    },
    message: {
      type: String,
      required: [true, "Notification message is required"],
      trim: true,
    },
    // Optional reference to related entity
    relatedEntity: {
      entityType: {
        type: String,
        enum: ["job", "application", "resume"],
      },
      entityId: {
        type: mongoose.Schema.Types.ObjectId,
      },
    },
    isRead: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Index for unread notifications query
notificationSchema.index({ user: 1, isRead: 1, createdAt: -1 });

const Notification = mongoose.model("Notification", notificationSchema);
export default Notification;
```

---

## Field Reference

| Field | Type | Required | Default | Description |
|-------|------|----------|---------|-------------|
| `_id` | ObjectId | Auto | Auto | Primary key |
| `user` | ObjectId (ref: User) | ✅ | — | Recipient of this notification |
| `type` | String (enum) | ✅ | — | Category of notification |
| `title` | String | ✅ | — | Short title (e.g., "Application Updated") |
| `message` | String | ✅ | — | Full message body |
| `relatedEntity.entityType` | String (enum) | No | — | What entity this relates to |
| `relatedEntity.entityId` | ObjectId | No | — | ID of the related entity |
| `isRead` | Boolean | No | `false` | Read/unread status |
| `createdAt` | Date | Auto | Auto | When created |
| `updatedAt` | Date | Auto | Auto | Timestamp |

---

## 🔗 Relationships

| Direction | Related Collection | Type | FK Field |
|-----------|--------------------|------|----------|
| ⬆️ Parent | `users` | Many-to-One | `this.user → users._id` |
| 🔗 Dynamic Ref | `jobs` / `applications` / `resumes` | Polymorphic | `relatedEntity.entityId` |

---

## 📌 Notes

- `relatedEntity` is a polymorphic reference — the `entityType` tells you which collection `entityId` refers to.
- The bell icon in the dashboard header shows the unread notification count (`{ user, isRead: false }`).
- Notifications are created by the email/notification service (MVP6 Phase 4).
