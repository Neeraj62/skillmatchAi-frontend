import express from "express";
import { createProfile, getProfile, updateProfile } from "./recruiter-profile.controller.js";
import authMiddleware from "../../middlewares/authMiddleware.js";
import { upload } from "../../config/cloudinary.js";

const router = express.Router();

router.post("/", authMiddleware, upload.single("logo"), createProfile);
router.get("/:userId", authMiddleware, getProfile);
router.put("/:userId", authMiddleware, upload.single("logo"), updateProfile);

export default router;
