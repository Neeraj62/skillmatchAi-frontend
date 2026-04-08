import express from "express";
import { getUsageLogs } from "./ai-usage-log.controller.js";

const router = express.Router();

router.get("/", getUsageLogs);

export default router;
