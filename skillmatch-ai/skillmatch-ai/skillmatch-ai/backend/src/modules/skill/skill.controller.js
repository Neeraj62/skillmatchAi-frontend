import Skill from "./skill.model.js";
import ApiError from "../../utils/ApiError.js";
import ApiResponse from "../../utils/ApiResponse.js";
import asyncHandler from "../../utils/asyncHandler.js";

export const searchSkills = asyncHandler(async (req, res) => {
  const { q } = req.query;

  if (!q) {
    throw new ApiError(400, "Search query 'q' is required");
  }

  const skills = await Skill.find({
    $or: [
      { skillName: { $regex: q, $options: "i" } },
      { displayName: { $regex: q, $options: "i" } },
      { aliases: { $regex: q, $options: "i" } },
    ],
  }).limit(10);

  res.status(200).json(
    new ApiResponse(200, "Skills search results", skills)
  );
});
