import mongoose from "mongoose";

const skillSchema = new mongoose.Schema(
  {
    skillName: {
      type: String,
      required: [true, "Skill name is required"],
      unique: true,
      trim: true,
      lowercase: true,
      // Canonical name: "javascript", "react", "mongodb"
    },
    displayName: {
      type: String,
      required: true,
      trim: true,
      // Human-readable: "JavaScript", "React", "MongoDB"
    },
    aliases: {
      type: [String],
      default: [],
      // e.g., ["js", "ecmascript", "es6", "es2015"]
    },
    category: {
      type: String,
      trim: true,
      // e.g., "Programming Language", "Framework", "Database", "DevOps", "Soft Skill"
    },
  },
  {
    timestamps: true,
  }
);

// Text index for autocomplete search
skillSchema.index({ skillName: "text", aliases: "text", displayName: "text" });

const Skill = mongoose.model("Skill", skillSchema);
export default Skill;
