import CandidateExperience from "./candidate-experience.model.js";
import ApiError from "../../utils/ApiError.js";
import ApiResponse from "../../utils/ApiResponse.js";
import asyncHandler from "../../utils/asyncHandler.js";
import { calculateCompletion } from "../candidate-profile/candidate-profile.controller.js";
import CandidateProfile from "../candidate-profile/candidate-profile.model.js";

export const createExperience = asyncHandler(async (req, res) => {
  const { candidateProfile, jobTitle, company, startDate, endDate, isCurrent, description } = req.body;

  if (!candidateProfile || !jobTitle || !company || !startDate) {
    throw new ApiError(400, "Missing required fields: candidateProfile, jobTitle, company, or startDate");
  }

  const experience = await CandidateExperience.create({
    candidateProfile,
    jobTitle,
    company,
    startDate,
    endDate,
    isCurrent,
    description
  });

  // Update completion percentage
  const profile = await CandidateProfile.findById(candidateProfile);
  if (profile) await calculateCompletion(profile._id, profile.user);

  res.status(201).json(
    new ApiResponse(201, "Work experience added successfully", experience)
  );
});

export const updateExperience = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  const experience = await CandidateExperience.findByIdAndUpdate(
    id,
    { $set: updateData },
    { new: true, runValidators: true }
  );

  if (!experience) {
    throw new ApiError(404, "Experience entry not found");
  }

  res.status(200).json(
    new ApiResponse(200, "Experience entry updated successfully", experience)
  );
});

export const deleteExperience = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const experience = await CandidateExperience.findById(id);
  if (!experience) {
    throw new ApiError(404, "Experience entry not found");
  }

  const profileId = experience.candidateProfile;
  await experience.deleteOne();

  // Update completion percentage
  const profile = await CandidateProfile.findById(profileId);
  if (profile) await calculateCompletion(profile._id, profile.user);

  res.status(200).json(
    new ApiResponse(200, "Experience entry removed successfully")
  );
});

export const getExperienceByProfile = asyncHandler(async (req, res) => {
  const { profileId } = req.params;

  if (!profileId) {
    throw new ApiError(400, "Profile ID is required");
  }

  const experiences = await CandidateExperience.find({ candidateProfile: profileId }).sort("-startDate");

  res.status(200).json(
    new ApiResponse(200, "Experience history retrieved", experiences)
  );
});
