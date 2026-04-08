import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    filename: {
      type: String,
      required: [true, "Filename is required"],
      trim: true,
    },
    fileUrl: {
      type: String,
      required: [true, "File URL is required"],
      trim: true,
      // Cloudinary or S3 signed URL
    },
    fileSize: {
      type: Number, // in bytes
      required: true,
      max: [5 * 1024 * 1024, "File size cannot exceed 5MB"], // 5MB limit
    },
    fileType: {
      type: String,
      enum: ["pdf", "docx"],
      required: true,
    },
    // ─── AI-Extracted Fields (populated after async processing) ───
    aiExtractedText: {
      type: String, // Full raw text extracted from resume
    },
    aiSkills: {
      type: [String], // Array of extracted skill strings
      default: [],
    },
    aiSummary: {
      type: String, // AI-generated candidate summary
    },
    aiEducation: {
      type: [
        {
          degree: String,
          institution: String,
          year: String,
        },
      ],
      default: [],
    },
    aiExperience: {
      type: [
        {
          title: String,
          company: String,
          duration: String,
        },
      ],
      default: [],
    },
    aiParseStatus: {
      type: String,
      enum: ["pending", "processing", "analyzed", "failed"],
      default: "pending",
    },
    isPrimary: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Ensure only one primary resume per user
resumeSchema.pre("save", async function (next) {
  if (this.isPrimary) {
    await this.constructor.updateMany(
      { user: this.user, _id: { $ne: this._id } },
      { isPrimary: false }
    );
  }
  next();
});

const Resume = mongoose.model("Resume", resumeSchema);
export default Resume;
