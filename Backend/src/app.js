import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { errorHandler, notFound } from './middlewares/errorHandler.js';
import routes from './routes/index.js';

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging in development
if (process.env.NODE_ENV === 'development') {
  app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`);
    next();
  });
}

// Routes
app.use('/api', routes);

// Error Handling
app.use(notFound);
app.use(errorHandler);

export default app;
