import express from "express";
import { uploadResume, getResumesByUser, togglePrimary, deleteResume } from "./resume.controller.js";
import authMiddleware from "../../middlewares/authMiddleware.js";
import { uploadResume as multerUpload } from "../../config/cloudinary.js";

const router = express.Router();

router.post("/", authMiddleware, multerUpload.single("resume"), uploadResume);
router.get("/user/:userId", authMiddleware, getResumesByUser);
router.patch("/:id/primary", authMiddleware, togglePrimary);
router.delete("/:id", authMiddleware, deleteResume);

export default router;
