import mongoose from "mongoose";

const candidateSkillSchema = new mongoose.Schema(
  {
    candidateProfile: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CandidateProfile",
      required: true,
      index: true,
    },
    skillName: {
      type: String,
      required: [true, "Skill name is required"],
      trim: true,
      lowercase: true,
    },
    proficiencyLevel: {
      type: String,
      enum: {
        values: ["beginner", "intermediate", "expert"],
        message: "Proficiency must be beginner, intermediate, or expert",
      },
      default: "intermediate",
    },
  },
  {
    timestamps: true,
  }
);

// Compound index: one skill per candidate profile (no duplicates)
candidateSkillSchema.index({ candidateProfile: 1, skillName: 1 }, { unique: true });

const CandidateSkill = mongoose.model("CandidateSkill", candidateSkillSchema);
export default CandidateSkill;
