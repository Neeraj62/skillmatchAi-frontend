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
