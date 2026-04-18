import express from "express";
import { createProfile, getProfile, updateProfile } from "./candidate-profile.controller.js";
import authMiddleware from "../../middlewares/authMiddleware.js";
import { upload } from "../../config/cloudinary.js";

const router = express.Router();

router.post("/", authMiddleware, upload.single("avatar"), createProfile);
router.get("/:userId", authMiddleware, getProfile);
router.put("/:userId", authMiddleware, upload.single("avatar"), updateProfile);

export default router;
