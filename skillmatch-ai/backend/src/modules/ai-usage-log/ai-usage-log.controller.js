import AiUsageLog from "./ai-usage-log.model.js";
import ApiError from "../../utils/ApiError.js";
import ApiResponse from "../../utils/ApiResponse.js";
import asyncHandler from "../../utils/asyncHandler.js";

export const getUsageLogs = asyncHandler(async (req, res) => {
  const logs = await AiUsageLog.find().sort("-createdAt");

  res.status(200).json(
    new ApiResponse(200, "AI usage logs retrieved", logs)
  );
});
