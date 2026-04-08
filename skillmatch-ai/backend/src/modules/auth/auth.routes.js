import express from "express";
import { signup, login, logout } from "./auth.controller.js";
import authMiddleware from "../../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", authMiddleware, logout);

export default router;
