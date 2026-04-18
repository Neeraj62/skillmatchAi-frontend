import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: true,
      index: true,
    },
    resume: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Resume",
      required: true,
    },
    coverLetter: {
      type: String,
      trim: true,
      maxlength: [3000, "Cover letter cannot exceed 3000 characters"],
    },
    status: {
      type: String,
      enum: ["applied", "screening", "shortlisted", "interview", "offered", "rejected"],
      default: "applied",
    },
    // ─── AI Match Score (computed async by Bull queue) ───
    aiMatchScore: {
      type: Number,
      min: 0,
      max: 100,
      default: null, // null until AI computes it
    },
    aiMatchBreakdown: {
      skillsScore: { type: Number, min: 0, max: 100 },
      experienceScore: { type: Number, min: 0, max: 100 },
      matchedRequiredSkills: { type: [String], default: [] },
      missingRequiredSkills: { type: [String], default: [] },
      matchedNiceToHaveSkills: { type: [String], default: [] },
      strengths: { type: [String], default: [] },
      gaps: { type: [String], default: [] },
      aiRecommendation: {
        type: String,
        enum: ["Strong Match", "Good Match", "Partial Match", "Not Recommended"],
      },
      shortSummary: { type: String },
    },
    rank: {
      type: Number, // Ranking position among all applicants for this job
      default: null,
    },
    recruiterNotes: {
      type: [
        {
          note: { type: String, trim: true },
          addedAt: { type: Date, default: Date.now },
        },
      ],
      default: [],
    },
    statusHistory: {
      type: [
        {
          status: {
            type: String,
            enum: ["applied", "screening", "shortlisted", "interview", "offered", "rejected"],
          },
          changedAt: { type: Date, default: Date.now },
          changedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        },
      ],
      default: [],
    },
    appliedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Prevent duplicate applications: one user can apply only once per job
applicationSchema.index({ user: 1, job: 1 }, { unique: true });

const Application = mongoose.model("Application", applicationSchema);
export default Application;
