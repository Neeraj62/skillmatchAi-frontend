import mongoose from "mongoose";

const recruiterProfileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
      index: true,
    },
    companyName: {
      type: String,
      required: [true, "Company name is required"],
      trim: true,
      maxlength: [200, "Company name cannot exceed 200 characters"],
    },
    companyLogoUrl: {
      type: String, // Cloudinary / S3 URL
      trim: true,
    },
    companySize: {
      type: String,
      enum: ["1-10", "11-50", "51-200", "201-1000", "1000+"],
    },
    industry: {
      type: String,
      trim: true,
      // e.g., "Information Technology", "Healthcare", "Finance"
    },
    companyWebsite: {
      type: String,
      trim: true,
    },
    companyDescription: {
      type: String,
      trim: true,
      maxlength: [3000, "Company description cannot exceed 3000 characters"],
    },
    location: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const RecruiterProfile = mongoose.model("RecruiterProfile", recruiterProfileSchema);
export default RecruiterProfile;
