import express from 'express';
import userRoutes from './user.routes.js';

const router = express.Router();

// Health check route
router.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is running perfectly',
    timestamp: new Date().toISOString(),
  });
});

// API info route
router.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Welcome to Hackathon API',
    version: '1.0.0',
    endpoints: {
      health: '/api/health',
      users: '/api/users',
    },
  });
});

// Feature routes
router.use('/users', userRoutes);

export default router;
