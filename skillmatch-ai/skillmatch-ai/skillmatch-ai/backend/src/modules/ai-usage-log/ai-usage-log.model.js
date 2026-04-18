import mongoose from "mongoose";

const aiUsageLogSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      index: true,
      // Which user triggered the AI call (can be null for system-level jobs)
    },
    taskType: {
      type: String,
      enum: ["resume_parse", "job_match", "recommendation"],
      required: true,
    },
    model: {
      type: String,
      default: "gpt-4o-mini",
      // e.g., "gpt-4o-mini", "gpt-4o"
    },
    inputTokens: {
      type: Number,
      required: true,
      min: 0,
    },
    outputTokens: {
      type: Number,
      required: true,
      min: 0,
    },
    totalTokens: {
      type: Number,
      required: true,
      min: 0,
    },
    costUsd: {
      type: Number,
      required: true,
      min: 0,
      // Estimated cost in USD based on model pricing
      // gpt-4o-mini: $0.15/1M input, $0.60/1M output
    },
    costInr: {
      type: Number,
      min: 0,
      // Converted to INR for budget tracking
    },
    success: {
      type: Boolean,
      default: true,
    },
    errorMessage: {
      type: String,
      // Only populated if success: false
    },
    relatedEntityId: {
      type: mongoose.Schema.Types.ObjectId,
      // Could reference a resume, application, etc.
    },
    relatedEntityType: {
      type: String,
      enum: ["resume", "application"],
    },
  },
  {
    timestamps: true,
  }
);

// Index for monthly aggregation queries
aiUsageLogSchema.index({ createdAt: -1 });
aiUsageLogSchema.index({ taskType: 1, createdAt: -1 });

const AiUsageLog = mongoose.model("AiUsageLog", aiUsageLogSchema);
export default AiUsageLog;
