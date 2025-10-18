import app from './app.js';
import connectDB from './config/db.js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const PORT = process.env.PORT || 5000;

// Connect to database
connectDB();

// Start server
const server = app.listen(PORT, () => {
  console.log('');
  console.log('=================================================');
  console.log(`Server running in ${process.env.NODE_ENV} mode`);
  console.log(`Server is listening on port ${PORT}`);
  console.log(`API URL: http://localhost:${PORT}/api`);
  console.log('=================================================');
  console.log('');
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error(`Unhandled Rejection: ${err.message}`);
  server.close(() => process.exit(1));
});

// Handle SIGTERM
process.on('SIGTERM', () => {
  console.log('SIGTERM received. Shutting down gracefully...');
  server.close(() => {
    console.log('Process terminated');
  });
});
