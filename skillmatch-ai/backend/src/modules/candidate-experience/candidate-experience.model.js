import mongoose from "mongoose";

const candidateExperienceSchema = new mongoose.Schema(
  {
    candidateProfile: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CandidateProfile",
      required: true,
      index: true,
    },
    jobTitle: {
      type: String,
      required: [true, "Job title is required"],
      trim: true,
    },
    company: {
      type: String,
      required: [true, "Company name is required"],
      trim: true,
    },
    startDate: {
      type: Date,
      required: [true, "Start date is required"],
    },
    endDate: {
      type: Date,
      // null if currently working here
    },
    isCurrent: {
      type: Boolean,
      default: false,
    },
    description: {
      type: String,
      trim: true,
      maxlength: [2000, "Description cannot exceed 2000 characters"],
      // Responsibilities, achievements, etc.
    },
  },
  {
    timestamps: true,
  }
);

const CandidateExperience = mongoose.model("CandidateExperience", candidateExperienceSchema);
export default CandidateExperience;
