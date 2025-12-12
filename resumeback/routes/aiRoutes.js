import express from "express";
import {
  enhanceJobDescription,
  enhanceProfessionalSummary,
  uploadResume,
} from "../controllers/aiController.js";
import protect from "../middlewares/authmiddleware.js";

// Wrapper to catch async errors automatically
const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

const aiRouter = express.Router();

// -------------------------
// AI Routes
// -------------------------

// Enhance Professional Summary
aiRouter.post(
  "/enhance-pro-sum",
  protect,
  asyncHandler(enhanceProfessionalSummary)
);

// Enhance Job Description
aiRouter.post(
  "/enhance-job-desc",
  protect,
  asyncHandler(enhanceJobDescription)
);

// Upload Resume (resume text extraction)
aiRouter.post(
  "/upload-resume",
  protect,
  asyncHandler(uploadResume)
);

export default aiRouter;
