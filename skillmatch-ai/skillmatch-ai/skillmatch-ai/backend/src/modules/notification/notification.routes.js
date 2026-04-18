import express from "express";
import { getNotifications, markAsRead } from "./notification.controller.js";

const router = express.Router();

router.get("/user/:userId", getNotifications);
router.patch("/:id/read", markAsRead);

export default router;
