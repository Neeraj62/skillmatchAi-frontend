import RecruiterProfile from "./recruiter-profile.model.js";
import ApiError from "../../utils/ApiError.js";
import ApiResponse from "../../utils/ApiResponse.js";
import asyncHandler from "../../utils/asyncHandler.js";
import { cloudinary } from "../../config/cloudinary.js";

export const createProfile = asyncHandler(async (req, res) => {
  const { user, companyName, companySize, industry, companyWebsite, companyDescription, location } = req.body;

  if (!user || !companyName) {
    throw new ApiError(400, "User ID and Company Name are required");
  }

  const existingProfile = await RecruiterProfile.findOne({ user });
  if (existingProfile) {
    throw new ApiError(409, "Recruiter profile already exists for this user. Use PUT to update.");
  }

  // Handle company logo upload
  let companyLogoUrl = "";
  if (req.file) {
    companyLogoUrl = req.file.path;
  }

  const profile = await RecruiterProfile.create({
    user,
    companyName,
    companyLogoUrl,
    companySize,
    industry,
    companyWebsite,
    companyDescription,
    location
  });

  res.status(201).json(
    new ApiResponse(201, "Recruiter profile created successfully", profile)
  );
});

export const updateProfile = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const updateData = req.body;

  // Prevent user ID update
  delete updateData.user;

  const profile = await RecruiterProfile.findOne({ user: userId });
  if (!profile) {
    throw new ApiError(404, "Recruiter profile not found");
  }

  // Handle logo update
  if (req.file) {
    if (profile.companyLogoUrl) {
      const publicId = profile.companyLogoUrl.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(`skillmatch-ai/avatars/${publicId}`).catch(err => console.error("Cloudinary delete error:", err));
    }
    updateData.companyLogoUrl = req.file.path;
  }

  const updatedProfile = await RecruiterProfile.findOneAndUpdate(
    { user: userId },
    { $set: updateData },
    { new: true, runValidators: true }
  );

  res.status(200).json(
    new ApiResponse(200, "Recruiter profile updated successfully", updatedProfile)
  );
});

export const getProfile = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  if (!userId) {
    throw new ApiError(400, "User ID is required");
  }

  const profile = await RecruiterProfile.findOne({ user: userId }).populate("user", "name email role");

  if (!profile) {
    throw new ApiError(404, "Recruiter profile not found");
  }

  res.status(200).json(
    new ApiResponse(200, "Profile retrieved successfully", profile)
  );
});
