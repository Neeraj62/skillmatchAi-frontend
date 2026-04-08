import express from "express";
import { createSkill, getSkillsByProfile, updateSkill, deleteSkill } from "./candidate-skill.controller.js";
import authMiddleware from "../../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, createSkill);
router.get("/profile/:profileId", authMiddleware, getSkillsByProfile);
router.put("/:id", authMiddleware, updateSkill);
router.delete("/:id", authMiddleware, deleteSkill);

export default router;
