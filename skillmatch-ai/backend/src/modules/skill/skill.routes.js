import express from "express";
import { searchSkills } from "./skill.controller.js";

const router = express.Router();

router.get("/search", searchSkills);

export default router;
