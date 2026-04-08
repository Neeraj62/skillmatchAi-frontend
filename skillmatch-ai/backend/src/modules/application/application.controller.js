import mongoose from "mongoose";
import Application from "./application.model.js";
import ApiError from "../../utils/ApiError.js";
import ApiResponse from "../../utils/ApiResponse.js";
import asyncHandler from "../../utils/asyncHandler.js";

export const applyForJob = asyncHandler(async (req, res) => {
  const { user, job, resume, coverLetter } = req.body;

  if (!user || !job || !resume) {
    throw new ApiError(400, "User ID, Job ID, and Resume ID are required to apply");
  }

  // Check if job exists and is active
  const jobDoc = await mongoose.model("Job").findById(job);
  if (!jobDoc || jobDoc.status !== "active") {
    throw new ApiError(400, "Job is no longer active or does not exist");
  }

  const existingApplication = await Application.findOne({ user, job });
  if (existingApplication) {
    throw new ApiError(409, "You have already applied for this job");
  }

  const application = await Application.create({
    user,
    job,
    resume,
    coverLetter,
    statusHistory: [{ status: "applied", changedAt: new Date(), changedBy: user }]
  });

  // Increment application count for job
  jobDoc.applicationsCount += 1;
  await jobDoc.save();

  res.status(201).json(
    new ApiResponse(201, "Application submitted successfully", application)
  );
});

export const updateApplicationStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { status, recruiterNotes } = req.body;

  const validStatuses = ["applied", "screening", "shortlisted", "interview", "offered", "rejected"];
  if (!validStatuses.includes(status)) {
    throw new ApiError(400, "Invalid application status");
  }

  const application = await Application.findById(id);
  if (!application) {
    throw new ApiError(404, "Application not found");
  }

  application.status = status;
  application.statusHistory.push({
    status,
    changedAt: new Date(),
    changedBy: req.user?._id // Assumes authMiddleware sets req.user
  });

  if (recruiterNotes) {
    application.recruiterNotes.push({
      note: recruiterNotes,
      addedAt: new Date()
    });
  }

  await application.save();

  res.status(200).json(
    new ApiResponse(200, "Application status updated successfully", application)
  );
});

export const getApplicationsByJob = asyncHandler(async (req, res) => {
  const { jobId } = req.params;

  if (!jobId) {
    throw new ApiError(400, "Job ID is required");
  }

  const applications = await Application.find({ job: jobId })
    .populate("user", "name email avatarUrl")
    .populate("resume", "filename fileUrl")
    .sort("-createdAt");

  res.status(200).json(
    new ApiResponse(200, "Applications retrieved", applications)
  );
});

export const getRecruiterApplications = asyncHandler(async (req, res) => {
  const { recruiterId } = req.params;

  // Find all jobs by this recruiter first
  const jobs = await mongoose.model("Job").find({ recruiterId }).select("_id");
  const jobIds = jobs.map(j => j._id);

  const applications = await Application.find({ job: { $in: jobIds } })
    .populate("user", "name email avatarUrl")
    .populate("job", "title location jobType")
    .populate("resume", "filename fileUrl")
    .sort("-createdAt");

  res.status(200).json(
    new ApiResponse(200, "Recruiter applications retrieved", applications)
  );
});

export const getCandidateApplications = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  const applications = await Application.find({ user: userId })
    .populate("job", "title location jobType")
    .sort("-createdAt");

  res.status(200).json(
    new ApiResponse(200, "Candidate applications retrieved", applications)
  );
});

export const revokeApplication = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const application = await Application.findById(id);
  if (!application) {
    throw new ApiError(404, "Application not found");
  }

  // Only allow revoking if status is 'applied' or 'screening'
  if (!["applied", "screening"].includes(application.status)) {
    throw new ApiError(400, "Cannot revoke application at this stage");
  }

  const jobDoc = await mongoose.model("Job").findById(application.job);
  if (jobDoc && jobDoc.applicationsCount > 0) {
    jobDoc.applicationsCount -= 1;
    await jobDoc.save();
  }

  await application.deleteOne();

  res.status(200).json(
    new ApiResponse(200, "Application revoked successfully")
  );
});
