import asyncHandler from '../utils/asyncHandler.js';
import { successResponse, errorResponse } from '../utils/response.js';
import User from '../models/User.model.js';

// @desc    Get all users (example)
// @route   GET /api/users
// @access  Public (change as needed)
export const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({}).select('-password');

  successResponse(res, users, 'Users fetched successfully');
});

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Public (change as needed)
export const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password');

  if (!user) {
    return errorResponse(res, 'User not found', 404);
  }

  successResponse(res, user, 'User fetched successfully');
});

// @desc    Create new user
// @route   POST /api/users
// @access  Public (change as needed)
export const createUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  // Check if user already exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    return errorResponse(res, 'User already exists with this email', 400);
  }

  // Create user
  const user = await User.create({
    name,
    email,
    password,
  });

  successResponse(res, user, 'User created successfully', 201);
});

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private (change as needed)
export const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return errorResponse(res, 'User not found', 404);
  }

  const { name, email } = req.body;

  user.name = name || user.name;
  user.email = email || user.email;

  const updatedUser = await user.save();

  successResponse(res, updatedUser, 'User updated successfully');
});

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private (change as needed)
export const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return errorResponse(res, 'User not found', 404);
  }

  await user.deleteOne();

  successResponse(res, null, 'User deleted successfully');
});
