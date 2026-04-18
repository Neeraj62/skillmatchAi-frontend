import mongoose from "mongoose";

const candidateEducationSchema = new mongoose.Schema(
  {
    candidateProfile: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CandidateProfile",
      required: true,
      index: true,
    },
    degree: {
      type: String,
      required: [true, "Degree is required"],
      trim: true,
      // e.g., "B.Tech", "MBA", "M.Sc"
    },
    institution: {
      type: String,
      required: [true, "Institution name is required"],
      trim: true,
    },
    fieldOfStudy: {
      type: String,
      trim: true,
      // e.g., "Computer Science", "Business Administration"
    },
    startYear: {
      type: Number,
      min: 1950,
      max: 2030,
    },
    endYear: {
      type: Number,
      min: 1950,
      max: 2035,
    },
    grade: {
      type: String,
      trim: true,
      // e.g., "8.5 CGPA", "First Class", "85%"
    },
  },
  {
    timestamps: true,
  }
);

const CandidateEducation = mongoose.model("CandidateEducation", candidateEducationSchema);
export default CandidateEducation;
