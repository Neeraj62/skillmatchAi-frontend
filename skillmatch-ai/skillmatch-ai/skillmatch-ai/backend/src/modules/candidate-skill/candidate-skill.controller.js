import CandidateSkill from "./candidate-skill.model.js";
import ApiError from "../../utils/ApiError.js";
import ApiResponse from "../../utils/ApiResponse.js";
import asyncHandler from "../../utils/asyncHandler.js";
import { calculateCompletion } from "../candidate-profile/candidate-profile.controller.js";
import CandidateProfile from "../candidate-profile/candidate-profile.model.js";

export const createSkill = asyncHandler(async (req, res) => {
  const { candidateProfile, skillName, proficiencyLevel } = req.body;

  if (!candidateProfile || !skillName) {
    throw new ApiError(400, "Missing required fields: candidateProfile or skillName");
  }

  const skill = await CandidateSkill.create({
    candidateProfile,
    skillName: skillName.toLowerCase(),
    proficiencyLevel: proficiencyLevel || "intermediate"
  });

  // Update completion percentage
  const profile = await CandidateProfile.findById(candidateProfile);
  if (profile) await calculateCompletion(profile._id, profile.user);

  res.status(201).json(
    new ApiResponse(201, "Skill added successfully", skill)
  );
});

export const updateSkill = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { proficiencyLevel } = req.body;

  const skill = await CandidateSkill.findByIdAndUpdate(
    id,
    { proficiencyLevel },
    { new: true, runValidators: true }
  );

  if (!skill) {
    throw new ApiError(404, "Skill not found");
  }

  res.status(200).json(
    new ApiResponse(200, "Skill updated successfully", skill)
  );
});

export const deleteSkill = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const skill = await CandidateSkill.findById(id);

  if (!skill) {
    throw new ApiError(404, "Skill not found");
  }

  const profileId = skill.candidateProfile;
  await skill.deleteOne();

  // Update completion percentage
  const profile = await CandidateProfile.findById(profileId);
  if (profile) await calculateCompletion(profile._id, profile.user);

  res.status(200).json(
    new ApiResponse(200, "Skill removed successfully")
  );
});

export const getSkillsByProfile = asyncHandler(async (req, res) => {
  const { profileId } = req.params;

  if (!profileId) {
    throw new ApiError(400, "Profile ID is required");
  }

  const skills = await CandidateSkill.find({ candidateProfile: profileId });

  res.status(200).json(
    new ApiResponse(200, "Skills retrieved", skills)
  );
});
