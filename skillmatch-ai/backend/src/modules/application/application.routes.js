import express from "express";
import { applyForJob, getApplicationsByJob, getCandidateApplications, updateApplicationStatus, revokeApplication, getRecruiterApplications } from "./application.controller.js";
import authMiddleware from "../../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, applyForJob);
router.get("/job/:jobId", authMiddleware, getApplicationsByJob);
router.get("/recruiter/:recruiterId", authMiddleware, getRecruiterApplications);
router.get("/user/:userId", authMiddleware, getCandidateApplications);
router.patch("/:id/status", authMiddleware, updateApplicationStatus);
router.delete("/:id", authMiddleware, revokeApplication);

export default router;
