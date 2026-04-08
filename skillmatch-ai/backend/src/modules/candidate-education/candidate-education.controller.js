import CandidateEducation from "./candidate-education.model.js";
import ApiError from "../../utils/ApiError.js";
import ApiResponse from "../../utils/ApiResponse.js";
import asyncHandler from "../../utils/asyncHandler.js";
import { calculateCompletion } from "../candidate-profile/candidate-profile.controller.js";
import CandidateProfile from "../candidate-profile/candidate-profile.model.js";

export const createEducation = asyncHandler(async (req, res) => {
  const { candidateProfile, degree, institution, fieldOfStudy, startYear, endYear, grade } = req.body;

  if (!candidateProfile || !degree || !institution) {
    throw new ApiError(400, "Missing required fields: candidateProfile, degree, or institution");
  }

  const education = await CandidateEducation.create({
    candidateProfile,
    degree,
    institution,
    fieldOfStudy,
    startYear,
    endYear,
    grade
  });

  // Update completion percentage
  const profile = await CandidateProfile.findById(candidateProfile);
  if (profile) await calculateCompletion(profile._id, profile.user);

  res.status(201).json(
    new ApiResponse(201, "Education entry added successfully", education)
  );
});

export const updateEducation = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  const education = await CandidateEducation.findByIdAndUpdate(
    id,
    { $set: updateData },
    { new: true, runValidators: true }
  );

  if (!education) {
    throw new ApiError(404, "Education entry not found");
  }

  res.status(200).json(
    new ApiResponse(200, "Education entry updated successfully", education)
  );
});

export const deleteEducation = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const education = await CandidateEducation.findById(id);
  if (!education) {
    throw new ApiError(404, "Education entry not found");
  }

  const profileId = education.candidateProfile;
  await education.deleteOne();

  // Update completion percentage
  const profile = await CandidateProfile.findById(profileId);
  if (profile) await calculateCompletion(profile._id, profile.user);

  res.status(200).json(
    new ApiResponse(200, "Education entry removed successfully")
  );
});

export const getEducationByProfile = asyncHandler(async (req, res) => {
  const { profileId } = req.params;

  if (!profileId) {
    throw new ApiError(400, "Profile ID is required");
  }

  const education = await CandidateEducation.find({ candidateProfile: profileId }).sort("-endYear");

  res.status(200).json(
    new ApiResponse(200, "Education history retrieved", education)
  );
});
