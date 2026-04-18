import User from "./user.model.js";
import ApiError from "../../utils/ApiError.js";
import ApiResponse from "../../utils/ApiResponse.js";
import asyncHandler from "../../utils/asyncHandler.js";

export const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select("-password").lean();

  res.status(200).json(
    new ApiResponse(200, "Users retrieved successfully", users)
  );
});

export const updateUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, phone } = req.body;

  const user = await User.findByIdAndUpdate(
    id,
    { $set: { name, phone } },
    { new: true, runValidators: true }
  ).select("-password");

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  res.status(200).json(
    new ApiResponse(200, "User updated successfully", user)
  );
});

export const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const user = await User.findByIdAndDelete(id);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  res.status(200).json(
    new ApiResponse(200, "User deleted successfully")
  );
});
