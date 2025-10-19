import Pitch from '../models/Pitch.model.js';
import geminiService from '../services/gemini.service.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { successResponse, errorResponse } from '../utils/response.js';

// @desc    Generate pitch using AI
// @route   POST /api/pitches/generate
// @access  Private
export const generatePitch = asyncHandler(async (req, res) => {
  const { ideaDescription } = req.body;

  if (!ideaDescription || ideaDescription.trim().length < 20) {
    return errorResponse(
      res,
      'Please provide a detailed idea description (at least 20 characters)',
      400
    );
  }

  // Call Gemini AI to generate pitch
  const aiGeneratedData = await geminiService.generatePitch(ideaDescription);

  // Create pitch in database
  const pitch = await Pitch.create({
    user: req.user._id,
    ideaDescription,
    projectName: aiGeneratedData.projectName,
    tagline: aiGeneratedData.tagline,
    pitchContent: aiGeneratedData.pitchContent,
    targetAudience: aiGeneratedData.targetAudience,
    problemStatement: aiGeneratedData.problemStatement || '',
    solution: aiGeneratedData.solution || '',
    uniqueValueProposition: aiGeneratedData.uniqueValueProposition || '',
    marketOpportunity: aiGeneratedData.marketOpportunity || '',
    status: 'completed',
  });

  successResponse(res, 'Pitch generated successfully', pitch, 201);
});

// @desc    Get all pitches for logged in user
// @route   GET /api/pitches
// @access  Private
export const getAllPitches = asyncHandler(async (req, res) => {
  const pitches = await Pitch.find({ user: req.user._id })
    .sort({ createdAt: -1 })
    .select('-__v');

  successResponse(res, 'Pitches retrieved successfully', {
    count: pitches.length,
    pitches,
  });
});

// @desc    Get single pitch by ID
// @route   GET /api/pitches/:id
// @access  Private
export const getPitchById = asyncHandler(async (req, res) => {
  const pitch = await Pitch.findById(req.params.id);

  if (!pitch) {
    return errorResponse(res, 'Pitch not found', 404);
  }

  // Check if pitch belongs to user
  if (pitch.user.toString() !== req.user._id.toString()) {
    return errorResponse(res, 'Not authorized to access this pitch', 403);
  }

  successResponse(res, 'Pitch retrieved successfully', pitch);
});

// @desc    Update pitch
// @route   PUT /api/pitches/:id
// @access  Private
export const updatePitch = asyncHandler(async (req, res) => {
  const pitch = await Pitch.findById(req.params.id);

  if (!pitch) {
    return errorResponse(res, 'Pitch not found', 404);
  }

  // Check if pitch belongs to user
  if (pitch.user.toString() !== req.user._id.toString()) {
    return errorResponse(res, 'Not authorized to update this pitch', 403);
  }

  // Update allowed fields
  const allowedUpdates = [
    'projectName',
    'tagline',
    'pitchContent',
    'targetAudience',
    'problemStatement',
    'solution',
    'uniqueValueProposition',
    'marketOpportunity',
    'status',
  ];

  allowedUpdates.forEach((field) => {
    if (req.body[field] !== undefined) {
      pitch[field] = req.body[field];
    }
  });

  await pitch.save();

  successResponse(res, 'Pitch updated successfully', pitch);
});

// @desc    Delete pitch
// @route   DELETE /api/pitches/:id
// @access  Private
export const deletePitch = asyncHandler(async (req, res) => {
  const pitch = await Pitch.findById(req.params.id);

  if (!pitch) {
    return errorResponse(res, 'Pitch not found', 404);
  }

  // Check if pitch belongs to user
  if (pitch.user.toString() !== req.user._id.toString()) {
    return errorResponse(res, 'Not authorized to delete this pitch', 403);
  }

  await pitch.deleteOne();

  successResponse(res, 'Pitch deleted successfully', null);
});

// @desc    Improve existing pitch using AI
// @route   POST /api/pitches/:id/improve
// @access  Private
export const improvePitch = asyncHandler(async (req, res) => {
  const { improvements } = req.body;

  if (!improvements || improvements.trim().length < 10) {
    return errorResponse(
      res,
      'Please provide improvement suggestions (at least 10 characters)',
      400
    );
  }

  const pitch = await Pitch.findById(req.params.id);

  if (!pitch) {
    return errorResponse(res, 'Pitch not found', 404);
  }

  // Check if pitch belongs to user
  if (pitch.user.toString() !== req.user._id.toString()) {
    return errorResponse(res, 'Not authorized to improve this pitch', 403);
  }

  // Call Gemini AI to improve pitch
  const improvedContent = await geminiService.improvePitch(
    pitch.pitchContent,
    improvements
  );

  pitch.pitchContent = improvedContent;
  await pitch.save();

  successResponse(res, 'Pitch improved successfully', pitch);
});

// @desc    Export pitch (mark as exported)
// @route   POST /api/pitches/:id/export
// @access  Private
export const exportPitch = asyncHandler(async (req, res) => {
  const pitch = await Pitch.findById(req.params.id);

  if (!pitch) {
    return errorResponse(res, 'Pitch not found', 404);
  }

  // Check if pitch belongs to user
  if (pitch.user.toString() !== req.user._id.toString()) {
    return errorResponse(res, 'Not authorized to export this pitch', 403);
  }

  pitch.status = 'exported';
  await pitch.save();

  successResponse(res, 'Pitch marked as exported', pitch);
});
