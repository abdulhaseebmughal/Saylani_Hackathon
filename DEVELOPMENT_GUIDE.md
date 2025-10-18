# Development Guide

## Quick Start

Both servers are now running:
- **Backend**: http://localhost:5000/api
- **Frontend**: http://localhost:5173
- **MongoDB**: Connected to `hackathon-db` database

## Project Architecture

### Backend (MVC Pattern)

```
src/
├── config/          # Configuration files
│   └── db.js       # MongoDB connection
├── controllers/     # Business logic handlers
│   └── user.controller.js
├── models/          # Database schemas
│   └── User.model.js
├── routes/          # API endpoints
│   ├── index.js
│   └── user.routes.js
├── middlewares/     # Custom middleware
│   └── errorHandler.js
├── services/        # Business logic layer
├── utils/           # Helper functions
│   ├── asyncHandler.js
│   └── response.js
├── app.js          # Express app setup
└── server.js       # Server entry point
```

### Frontend (Component-Based)

```
src/
├── components/      # Reusable UI components
│   └── Layout.jsx
├── pages/          # Page components
│   └── Home.jsx
├── services/       # API integration
│   └── api.js
├── config/         # App configuration
│   └── constants.js
├── utils/          # Helper functions
│   └── helpers.js
├── hooks/          # Custom React hooks
├── context/        # State management
└── assets/         # Static files
```

## Available API Endpoints

### Health Check
- `GET /api/health` - Check server status

### Users
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `POST /api/users` - Create new user
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

## Creating New Features

### 1. Create a Model (Backend)

```javascript
// Backend/src/models/YourModel.model.js
import mongoose from 'mongoose';

const yourSchema = new mongoose.Schema({
  field: { type: String, required: true }
}, { timestamps: true });

export default mongoose.model('YourModel', yourSchema);
```

### 2. Create a Controller (Backend)

```javascript
// Backend/src/controllers/your.controller.js
import asyncHandler from '../utils/asyncHandler.js';
import { successResponse, errorResponse } from '../utils/response.js';
import YourModel from '../models/YourModel.model.js';

export const getItems = asyncHandler(async (req, res) => {
  const items = await YourModel.find({});
  successResponse(res, items, 'Items fetched successfully');
});
```

### 3. Create Routes (Backend)

```javascript
// Backend/src/routes/your.routes.js
import express from 'express';
import { getItems } from '../controllers/your.controller.js';

const router = express.Router();
router.get('/', getItems);

export default router;
```

### 4. Register Routes (Backend)

```javascript
// Backend/src/routes/index.js
import yourRoutes from './your.routes.js';
router.use('/your-path', yourRoutes);
```

### 5. Create Service (Frontend)

```javascript
// Frontend/src/services/yourService.js
import api from './api';

export const getItems = async () => {
  return await api.get('/your-path');
};
```

### 6. Create Component (Frontend)

```jsx
// Frontend/src/components/YourComponent.jsx
import { useState, useEffect } from 'react';
import { getItems } from '../services/yourService';

function YourComponent() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    const data = await getItems();
    setItems(data);
  };

  return <div>{/* Your JSX */}</div>;
}
```

## Best Practices

### Backend
1. Always use `asyncHandler` wrapper for async route handlers
2. Use `successResponse` and `errorResponse` for consistent API responses
3. Validate input data using express-validator
4. Hash passwords before storing (already implemented in User model)
5. Use environment variables for sensitive data
6. Keep controllers thin - move business logic to services

### Frontend
1. Use functional components with hooks
2. Extract reusable logic into custom hooks
3. Use TailwindCSS for styling
4. Keep components small and focused
5. Use the API service layer for all HTTP requests
6. Handle loading and error states

## Environment Variables

### Backend (.env)
```
PORT=5000
NODE_ENV=development
MONGODB_URI=your_connection_string
JWT_SECRET=your_secret
JWT_EXPIRE=7d
CLIENT_URL=http://localhost:5173
```

### Frontend (.env)
```
VITE_API_URL=http://localhost:5000/api
VITE_APP_NAME=Hackathon Project
```

## Common Commands

### Backend
```bash
npm run dev      # Start development server with nodemon
npm start        # Start production server
```

### Frontend
```bash
npm run dev      # Start Vite dev server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

## Testing API with cURL

```bash
# Health check
curl http://localhost:5000/api/health

# Get all users
curl http://localhost:5000/api/users

# Create user
curl -X POST http://localhost:5000/api/users \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","password":"password123"}'
```

## Troubleshooting

### Backend won't start
- Check if MongoDB connection string is correct
- Ensure port 5000 is not in use
- Check `.env` file exists and has correct values

### Frontend won't start
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`
- Check if port 5173 is available
- Verify `.env` file has correct API URL

### Database connection fails
- Check MongoDB Atlas IP whitelist (allow 0.0.0.0/0 for testing)
- Verify database credentials
- Check network connectivity

## Next Steps

1. Implement authentication with JWT
2. Add form validation
3. Create protected routes
4. Add state management (Context API or Redux)
5. Implement file upload functionality
6. Add testing (Jest, React Testing Library)
7. Set up CI/CD pipeline
8. Add API documentation (Swagger)

## Resources

- [Express.js Documentation](https://expressjs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [React Documentation](https://react.dev/)
- [TailwindCSS Documentation](https://tailwindcss.com/)
- [Vite Documentation](https://vitejs.dev/)
