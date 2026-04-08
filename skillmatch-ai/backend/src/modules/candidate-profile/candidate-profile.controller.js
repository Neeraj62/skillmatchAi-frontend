import CandidateProfile from "./candidate-profile.model.js";
import ApiError from "../../utils/ApiError.js";
import ApiResponse from "../../utils/ApiResponse.js";
import asyncHandler from "../../utils/asyncHandler.js";
import { cloudinary } from "../../config/cloudinary.js";
import mongoose from "mongoose";

// ─── Calculate Profile Completion Helper ─────────────────────────────
export const calculateCompletion = async (profileId, userId) => {
  const profile = await CandidateProfile.findById(profileId);
  if (!profile) return 0;

  let score = 0;
  // Basic Info (Max 50)
  if (profile.headline) score += 10;
  if (profile.summary) score += 10;
  if (profile.location?.city) score += 5;
  if (profile.phone) score += 5;
  if (profile.linkedinUrl || profile.githubUrl) score += 10;
  if (profile.avatarUrl) score += 10;

  // Related Sections (Max 50)
  const [skills, edu, exp, resumes] = await Promise.all([
    mongoose.model("CandidateSkill").countDocuments({ candidateProfile: profileId }),
    mongoose.model("CandidateEducation").countDocuments({ candidateProfile: profileId }),
    mongoose.model("CandidateExperience").countDocuments({ candidateProfile: profileId }),
    mongoose.model("Resume").countDocuments({ user: userId }),
  ]);

  if (skills > 0) score += 15;
  if (edu > 0) score += 10;
  if (exp > 0) score += 10;
  if (resumes > 0) score += 15;

  const finalScore = Math.min(score, 100);
  
  // Update the profile with the new score
  await CandidateProfile.findByIdAndUpdate(profileId, { profileCompletionPercentage: finalScore });
  
  return finalScore;
};

export const createProfile = asyncHandler(async (req, res) => {
  const { user, headline, summary, location, phone, linkedinUrl, githubUrl, portfolioUrl, yearsOfExperience, currentSalary, expectedSalary, noticePeriod } = req.body;

  if (!user) {
    throw new ApiError(400, "User ID is required to create a profile");
  }

  const existingProfile = await CandidateProfile.findOne({ user });
  if (existingProfile) {
    throw new ApiError(409, "Profile already exists for this user. Use PUT to update.");
  }

  // Handle avatar upload if file is present
  let avatarUrl = "";
  if (req.file) {
    avatarUrl = req.file.path; // Cloudinary URL from multer-storage-cloudinary
  }

  const profile = await CandidateProfile.create({
    user,
    headline,
    summary,
    location,
    phone,
    linkedinUrl,
    githubUrl,
    portfolioUrl,
    yearsOfExperience,
    currentSalary,
    expectedSalary,
    noticePeriod,
    avatarUrl
  });

  profile.profileCompletionPercentage = await calculateCompletion(profile._id, user);
  await profile.save();

  res.status(201).json(
    new ApiResponse(201, "Candidate profile created successfully", profile)
  );
});

export const updateProfile = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const updateData = req.body;

  // Prevent user ID update
  delete updateData.user;

  const profile = await CandidateProfile.findOne({ user: userId });
  if (!profile) {
    throw new ApiError(404, "Profile not found");
  }

  // Handle avatar update
  if (req.file) {
    if (profile.avatarUrl) {
      const publicId = profile.avatarUrl.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(`skillmatch-ai/avatars/${publicId}`).catch(err => console.error("Cloudinary delete error:", err));
    }
    updateData.avatarUrl = req.file.path;
  }

  const updatedProfile = await CandidateProfile.findOneAndUpdate(
    { user: userId },
    { $set: updateData },
    { new: true, runValidators: true }
  );

  updatedProfile.profileCompletionPercentage = await calculateCompletion(updatedProfile._id, userId);
  await updatedProfile.save();

  res.status(200).json(
    new ApiResponse(200, "Profile updated successfully", updatedProfile)
  );
});

export const getProfile = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  if (!userId) {
    throw new ApiError(400, "User ID is required");
  }

  const profile = await CandidateProfile.findOne({ user: userId }).populate("user", "name email role");

  if (!profile) {
    throw new ApiError(404, "Profile not found");
  }

  res.status(200).json(
    new ApiResponse(200, "Profile retrieved successfully", profile)
  );
});
