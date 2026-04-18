import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    recruiterId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    title: {
      type: String,
      required: [true, "Job title is required"],
      trim: true,
      maxlength: [200, "Title cannot exceed 200 characters"],
    },
    description: {
      type: String,
      required: [true, "Job description is required"],
      trim: true,
      // Supports rich text (HTML from editor)
    },
    requiredSkills: {
      type: [String],
      default: [],
      // e.g., ["javascript", "react", "node.js", "mongodb"]
    },
    niceToHaveSkills: {
      type: [String],
      default: [],
    },
    location: {
      type: String,
      trim: true,
      // e.g., "Bangalore, India" or "Remote"
    },
    jobType: {
      type: String,
      enum: ["full-time", "part-time", "contract", "internship", "remote"],
      required: true,
    },
    experienceLevel: {
      type: String,
      enum: ["entry", "mid", "senior", "lead", "executive"],
      required: true,
    },
    salaryMin: {
      type: Number, // Monthly in INR
      min: 0,
    },
    salaryMax: {
      type: Number, // Monthly in INR
      min: 0,
    },
    salaryCurrency: {
      type: String,
      default: "INR",
    },
    isSalaryDisclosed: {
      type: Boolean,
      default: true,
    },
    openingsCount: {
      type: Number,
      default: 1,
      min: 1,
    },
    applicationDeadline: {
      type: Date,
    },
    status: {
      type: String,
      enum: ["draft", "active", "paused", "closed"],
      default: "draft",
    },
    viewsCount: {
      type: Number,
      default: 0,
    },
    applicationsCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Index for public job search
jobSchema.index({ status: 1, createdAt: -1 });

const Job = mongoose.model("Job", jobSchema);
export default Job;
