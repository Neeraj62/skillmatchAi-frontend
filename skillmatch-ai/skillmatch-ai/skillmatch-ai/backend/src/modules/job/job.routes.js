import express from "express";
import { createJob, getJobs, getJobById, updateJob, getRecruiterJobs, deleteJob } from "./job.controller.js";
import authMiddleware from "../../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, createJob);
router.get("/", getJobs);
router.get("/:jobId", getJobById);
router.put("/:jobId", authMiddleware, updateJob);
router.delete("/:jobId", authMiddleware, deleteJob);
router.get("/recruiter/:recruiterId", authMiddleware, getRecruiterJobs);

export default router;
