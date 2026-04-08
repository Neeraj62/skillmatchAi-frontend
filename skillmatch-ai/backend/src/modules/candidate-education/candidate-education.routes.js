import express from "express";
import { createEducation, getEducationByProfile, updateEducation, deleteEducation } from "./candidate-education.controller.js";
import authMiddleware from "../../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, createEducation);
router.get("/profile/:profileId", authMiddleware, getEducationByProfile);
router.put("/:id", authMiddleware, updateEducation);
router.delete("/:id", authMiddleware, deleteEducation);

export default router;
