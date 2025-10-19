# PitchCraft Backend

Backend API for PitchCraft - AI-powered pitch generation platform.

## Quick Start

### Prerequisites
- Node.js (v18 or higher)
- MongoDB Atlas account or local MongoDB
- Gemini API key

### Installation

1. Install dependencies:
```bash
npm install
```

2. Configure environment variables:
```bash
# Copy .env.example to .env
cp .env.example .env

# Edit .env with your credentials
```

3. Required environment variables:
- `MONGODB_URI` - Your MongoDB connection string
- `JWT_SECRET` - Secret key for JWT tokens
- `GEMINI_API_KEY` - Google Gemini API key
- `CLIENT_URL` - Frontend URL (for CORS)

### Running the Server

Development mode:
```bash
npm run dev
```

Production mode:
```bash
npm start
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Pitches
- `GET /api/pitches` - Get all user pitches
- `POST /api/pitches/generate` - Generate AI pitch
- `GET /api/pitches/:id` - Get single pitch
- `PUT /api/pitches/:id` - Update pitch
- `DELETE /api/pitches/:id` - Delete pitch

### Health Check
- `GET /api/health` - Check server status

## Deployment

### Render / Railway / Heroku
1. Connect your GitHub repository
2. Set environment variables in platform dashboard
3. Deploy from main branch

### Environment Variables for Production
Make sure to set all variables from `.env.example` in your deployment platform.

## Tech Stack
- Node.js + Express
- MongoDB + Mongoose
- JWT Authentication
- Google Gemini AI
- bcryptjs for password hashing
