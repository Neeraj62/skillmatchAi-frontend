import mongoose from "mongoose";

const candidateProfileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true, // One profile per user
      index: true,
    },
    headline: {
      type: String,
      trim: true,
      maxlength: [200, "Headline cannot exceed 200 characters"],
      // e.g., "Frontend Developer | 3 Years Exp"
    },
    summary: {
      type: String,
      trim: true,
      maxlength: [2000, "Summary cannot exceed 2000 characters"],
    },
    location: {
      city: { type: String, trim: true },
      country: { type: String, trim: true },
    },
    phone: {
      type: String,
      trim: true,
    },
    linkedinUrl: {
      type: String,
      trim: true,
    },
    githubUrl: {
      type: String,
      trim: true,
    },
    portfolioUrl: {
      type: String,
      trim: true,
    },
    yearsOfExperience: {
      type: Number,
      min: 0,
      max: 50,
      default: 0,
    },
    currentSalary: {
      type: Number, // Monthly in INR
      min: 0,
    },
    expectedSalary: {
      type: Number, // Monthly in INR
      min: 0,
    },
    noticePeriod: {
      type: Number, // In days
      min: 0,
      default: 0,
    },
    avatarUrl: {
      type: String, // Cloudinary / S3 URL
      trim: true,
    },
    profileCompletionPercentage: {
      type: Number,
      min: 0,
      max: 100,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const CandidateProfile = mongoose.model("CandidateProfile", candidateProfileSchema);
export default CandidateProfile;
