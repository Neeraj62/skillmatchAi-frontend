import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { setupSwagger } from "./config/swagger.js";
import globalErrorHandler from "./middlewares/globalErrorHandler.js";

// Import module routes
import authRoutes from "./modules/auth/auth.routes.js";
import userRoutes from "./modules/user/user.routes.js";
import candidateProfileRoutes from "./modules/candidate-profile/candidate-profile.routes.js";
import recruiterProfileRoutes from "./modules/recruiter-profile/recruiter-profile.routes.js";
import candidateSkillRoutes from "./modules/candidate-skill/candidate-skill.routes.js";
import candidateEducationRoutes from "./modules/candidate-education/candidate-education.routes.js";
import candidateExperienceRoutes from "./modules/candidate-experience/candidate-experience.routes.js";
import resumeRoutes from "./modules/resume/resume.routes.js";
import jobRoutes from "./modules/job/job.routes.js";
import applicationRoutes from "./modules/application/application.routes.js";
import notificationRoutes from "./modules/notification/notification.routes.js";
import skillRoutes from "./modules/skill/skill.routes.js";
import aiUsageLogRoutes from "./modules/ai-usage-log/ai-usage-log.routes.js";

// ESM __dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// View engine setup
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views", "pages"));

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN || "*",
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Setup Swagger
setupSwagger(app);

// Root route — renders landing page
app.get("/", (req, res) => {
  res.render("landing");
});

// Module routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/candidate-profile", candidateProfileRoutes);
app.use("/api/v1/recruiter-profile", recruiterProfileRoutes);
app.use("/api/v1/candidate-skill", candidateSkillRoutes);
app.use("/api/v1/candidate-education", candidateEducationRoutes);
app.use("/api/v1/candidate-experience", candidateExperienceRoutes);
app.use("/api/v1/resume", resumeRoutes);
app.use("/api/v1/job", jobRoutes);
app.use("/api/v1/application", applicationRoutes);
app.use("/api/v1/notification", notificationRoutes);
app.use("/api/v1/skill", skillRoutes);
app.use("/api/v1/ai-usage-log", aiUsageLogRoutes);

// Global Error Handler
app.use(globalErrorHandler);

export default app;
