import mongoose from 'mongoose';

const pitchSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User reference is required'],
    },
    ideaDescription: {
      type: String,
      required: [true, 'Idea description is required'],
      trim: true,
    },
    projectName: {
      type: String,
      required: [true, 'Project name is required'],
      trim: true,
    },
    tagline: {
      type: String,
      required: [true, 'Tagline is required'],
      trim: true,
    },
    pitchContent: {
      type: String,
      required: [true, 'Pitch content is required'],
    },
    targetAudience: {
      type: String,
      required: [true, 'Target audience is required'],
      trim: true,
    },
    problemStatement: {
      type: String,
      default: '',
    },
    solution: {
      type: String,
      default: '',
    },
    uniqueValueProposition: {
      type: String,
      default: '',
    },
    marketOpportunity: {
      type: String,
      default: '',
    },
    status: {
      type: String,
      enum: ['draft', 'completed', 'exported'],
      default: 'draft',
    },
  },
  {
    timestamps: true,
  }
);

// Index for faster queries
pitchSchema.index({ user: 1, createdAt: -1 });

const Pitch = mongoose.model('Pitch', pitchSchema);

export default Pitch;
