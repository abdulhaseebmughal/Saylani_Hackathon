# Quick Start Guide

## Your MERN Stack is Ready! 🚀

### Running Servers

**Backend**: http://localhost:5000/api
**Frontend**: http://localhost:5173
**Database**: MongoDB Atlas (Connected ✓)

---

## Daily Development Workflow

### 1. Start Your Servers

```bash
# Terminal 1 - Backend
cd Backend
npm run dev

# Terminal 2 - Frontend
cd Frontend
npm run dev
```

### 2. Open in Browser
Visit: http://localhost:5173

---

## Quick Commands

### Backend
```bash
npm run dev          # Start dev server
npm start            # Start production server
```

### Frontend
```bash
npm run dev          # Start Vite dev server
npm run build        # Build for production
npm run lint         # Lint code
```

---

## Test Your API

### Health Check
```bash
curl http://localhost:5000/api/health
```

### Create User
```bash
curl -X POST http://localhost:5000/api/users \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@test.com","password":"123456"}'
```

### Get All Users
```bash
curl http://localhost:5000/api/users
```

---

## Project Structure (Quick View)

```
Backend/src/
├── models/          ← Database schemas
├── controllers/     ← Business logic
├── routes/          ← API endpoints
└── config/          ← Database connection

Frontend/src/
├── pages/           ← Page components
├── components/      ← Reusable components
├── services/        ← API calls
└── utils/           ← Helper functions
```

---

## Adding a New Feature

### Backend (3 Steps)

1. **Create Model**: `src/models/Item.model.js`
```javascript
import mongoose from 'mongoose';
const itemSchema = new mongoose.Schema({
  name: String
}, { timestamps: true });
export default mongoose.model('Item', itemSchema);
```

2. **Create Controller**: `src/controllers/item.controller.js`
```javascript
import asyncHandler from '../utils/asyncHandler.js';
import { successResponse } from '../utils/response.js';
import Item from '../models/Item.model.js';

export const getItems = asyncHandler(async (req, res) => {
  const items = await Item.find({});
  successResponse(res, items);
});
```

3. **Create Route**: `src/routes/item.routes.js`
```javascript
import express from 'express';
import { getItems } from '../controllers/item.controller.js';
const router = express.Router();
router.get('/', getItems);
export default router;
```

Then add to `src/routes/index.js`:
```javascript
import itemRoutes from './item.routes.js';
router.use('/items', itemRoutes);
```

### Frontend (2 Steps)

1. **Create Service**: `src/services/itemService.js`
```javascript
import api from './api';
export const getItems = () => api.get('/items');
```

2. **Create Component**: `src/pages/Items.jsx`
```jsx
import { useState, useEffect } from 'react';
import { getItems } from '../services/itemService';

function Items() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    getItems().then(data => setItems(data));
  }, []);

  return <div>{/* Your JSX */}</div>;
}
```

---

## File Locations

### Environment Variables
- Backend: `Backend/.env`
- Frontend: `Frontend/.env`

### Main Entry Points
- Backend: `Backend/src/server.js`
- Frontend: `Frontend/src/main.jsx`

### Configuration
- Database: `Backend/src/config/db.js`
- API Client: `Frontend/src/services/api.js`

---

## Need Help?

1. Check logs in terminal
2. Verify `.env` files
3. Check `DEVELOPMENT_GUIDE.md` for details
4. Read `SETUP_COMPLETE.md` for full info

---

## Tips

✓ Use `npm run dev` for hot reload
✓ Check browser console for frontend errors
✓ Check terminal for backend errors
✓ MongoDB is already connected
✓ CORS is configured for localhost
✓ TailwindCSS is ready to use

**Happy Coding!** 🎯
