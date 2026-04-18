import Job from "./job.model.js";
import ApiError from "../../utils/ApiError.js";
import ApiResponse from "../../utils/ApiResponse.js";
import asyncHandler from "../../utils/asyncHandler.js";

export const createJob = asyncHandler(async (req, res) => {
  const { recruiterId, title, description, requiredSkills, niceToHaveSkills, location, jobType, experienceLevel, salaryMin, salaryMax, salaryCurrency, isSalaryDisclosed, openingsCount, applicationDeadline, status } = req.body;

  if (!recruiterId || !title || !description || !jobType || !experienceLevel) {
    throw new ApiError(400, "Missing required fields: recruiterId, title, description, jobType, or experienceLevel");
  }

  const job = await Job.create({
    recruiterId,
    title,
    description,
    requiredSkills,
    niceToHaveSkills,
    location,
    jobType,
    experienceLevel,
    salaryMin,
    salaryMax,
    salaryCurrency,
    isSalaryDisclosed,
    openingsCount,
    applicationDeadline,
    status: status || "active"
  });

  res.status(201).json(
    new ApiResponse(201, "Job posted successfully", job)
  );
});

export const updateJob = asyncHandler(async (req, res) => {
  const { jobId } = req.params;
  const updateData = req.body;

  const job = await Job.findByIdAndUpdate(
    jobId,
    { $set: updateData },
    { new: true, runValidators: true }
  );

  if (!job) {
    throw new ApiError(404, "Job not found");
  }

  res.status(200).json(
    new ApiResponse(200, "Job updated successfully", job)
  );
});

export const getJobs = asyncHandler(async (req, res) => {
  const { search, location, jobType, experienceLevel } = req.query;

  const filter = { status: "active" };

  if (search) {
    filter.$or = [
      { title: { $regex: search, $options: "i" } },
      { description: { $regex: search, $options: "i" } },
      { requiredSkills: { $in: [new RegExp(search, "i")] } }
    ];
  }

  if (location) filter.location = { $regex: location, $options: "i" };
  if (jobType) filter.jobType = jobType;
  if (experienceLevel) filter.experienceLevel = experienceLevel;

  const jobs = await Job.find(filter)
    .populate("recruiterId", "name email")
    .sort("-createdAt");

  res.status(200).json(
    new ApiResponse(200, "Jobs retrieved successfully", jobs)
  );
});

export const getRecruiterJobs = asyncHandler(async (req, res) => {
  const { recruiterId } = req.params;

  const jobs = await Job.find({ recruiterId }).sort("-createdAt");

  res.status(200).json(
    new ApiResponse(200, "Recruiter jobs retrieved", jobs)
  );
});

export const getJobById = asyncHandler(async (req, res) => {
  const { jobId } = req.params;

  const job = await Job.findById(jobId).populate("recruiterId", "name email");

  if (!job) {
    throw new ApiError(404, "Job not found");
  }

  // Increment view count
  job.viewsCount += 1;
  await job.save();

  res.status(200).json(
    new ApiResponse(200, "Job details retrieved", job)
  );
});

export const deleteJob = asyncHandler(async (req, res) => {
  const { jobId } = req.params;

  const job = await Job.findByIdAndDelete(jobId);

  if (!job) {
    throw new ApiError(404, "Job not found");
  }

  res.status(200).json(
    new ApiResponse(200, "Job deleted successfully")
  );
});
