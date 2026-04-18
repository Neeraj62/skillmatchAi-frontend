import express from "express";
import { createExperience, getExperienceByProfile, updateExperience, deleteExperience } from "./candidate-experience.controller.js";
import authMiddleware from "../../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, createExperience);
router.get("/profile/:profileId", authMiddleware, getExperienceByProfile);
router.put("/:id", authMiddleware, updateExperience);
router.delete("/:id", authMiddleware, deleteExperience);

export default router;
