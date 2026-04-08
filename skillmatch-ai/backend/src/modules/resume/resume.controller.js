import Resume from "./resume.model.js";
import ApiError from "../../utils/ApiError.js";
import ApiResponse from "../../utils/ApiResponse.js";
import asyncHandler from "../../utils/asyncHandler.js";
import { calculateCompletion } from "../candidate-profile/candidate-profile.controller.js";
import CandidateProfile from "../candidate-profile/candidate-profile.model.js";

export const uploadResume = asyncHandler(async (req, res) => {
  const { user, isPrimary } = req.body;

  if (!user) {
    throw new ApiError(400, "User ID is required");
  }

  if (!req.file) {
    throw new ApiError(400, "Resume file is required");
  }

  const filename = req.file.originalname;
  const fileUrl = req.file.path;
  const fileSize = req.file.size;
  const fileType = filename.split(".").pop().toLowerCase();

  if (!["pdf", "docx"].includes(fileType)) {
    throw new ApiError(400, "Only PDF and DOCX files are allowed");
  }

  // If this is the first resume, make it primary
  const existingResumesCount = await Resume.countDocuments({ user });
  const setPrimary = existingResumesCount === 0 ? true : (isPrimary === "true" || isPrimary === true);

  const resume = await Resume.create({
    user,
    filename,
    fileUrl,
    fileSize,
    fileType,
    isPrimary: setPrimary
  });

  // Update completion percentage
  const profile = await CandidateProfile.findOne({ user });
  if (profile) await calculateCompletion(profile._id, user);

  res.status(201).json(
    new ApiResponse(201, "Resume uploaded successfully", resume)
  );
});

export const togglePrimary = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const resume = await Resume.findById(id);
  if (!resume) {
    throw new ApiError(404, "Resume not found");
  }

  resume.isPrimary = true;
  await resume.save(); // pre-save hook handles other resumes

  res.status(200).json(
    new ApiResponse(200, "Resume set as primary", resume)
  );
});

export const deleteResume = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const resume = await Resume.findById(id);
  if (!resume) {
    throw new ApiError(404, "Resume not found");
  }

  if (resume.isPrimary) {
    const others = await Resume.countDocuments({ user: resume.user, _id: { $ne: resume._id } });
    if (others > 0) {
      throw new ApiError(400, "Cannot delete primary resume. Set another one as primary first.");
    }
  }

  const userId = resume.user;
  await resume.deleteOne();

  // Update completion percentage
  const profile = await CandidateProfile.findOne({ user: userId });
  if (profile) await calculateCompletion(profile._id, userId);

  res.status(200).json(
    new ApiResponse(200, "Resume deleted successfully")
  );
});

export const getResumesByUser = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  if (!userId) {
    throw new ApiError(400, "User ID is required");
  }

  const resumes = await Resume.find({ user: userId }).sort("-createdAt");

  res.status(200).json(
    new ApiResponse(200, "Resumes retrieved", resumes)
  );
});
