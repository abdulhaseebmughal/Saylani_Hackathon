# Hackathon MERN Stack Project

A professional, production-ready MERN (MongoDB, Express, React, Node.js) stack application.

## Project Structure

```
Hackathon/
├── Backend/                 # Express.js API Server
│   ├── src/
│   │   ├── config/         # Database and configuration files
│   │   ├── controllers/    # Route controllers
│   │   ├── models/         # Mongoose models
│   │   ├── routes/         # API routes
│   │   ├── middlewares/    # Custom middleware
│   │   ├── services/       # Business logic
│   │   ├── utils/          # Helper functions
│   │   ├── app.js          # Express app setup
│   │   └── server.js       # Server entry point
│   ├── .env                # Environment variables
│   ├── .env.example        # Environment variables template
│   └── package.json
│
└── Frontend/               # React Application
    ├── src/
    │   ├── components/     # Reusable components
    │   ├── pages/          # Page components
    │   ├── services/       # API service layer
    │   ├── utils/          # Helper functions
    │   ├── hooks/          # Custom React hooks
    │   ├── context/        # React context providers
    │   ├── config/         # Configuration files
    │   └── assets/         # Images, icons, etc.
    ├── .env                # Environment variables
    ├── .env.example        # Environment variables template
    └── package.json
```

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- MongoDB Atlas account or local MongoDB installation
- npm or yarn

### Backend Setup

1. Navigate to the Backend directory:
   ```bash
   cd Backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   - Copy `.env.example` to `.env`
   - Update the MongoDB connection string and other variables

4. Start the development server:
   ```bash
   npm run dev
   ```

   The API will be available at `http://localhost:5000`

### Frontend Setup

1. Navigate to the Frontend directory:
   ```bash
   cd Frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   - The `.env` file is already configured for local development

4. Start the development server:
   ```bash
   npm run dev
   ```

   The application will be available at `http://localhost:5173`

## Available Scripts

### Backend

- `npm run dev` - Start development server with hot reload
- `npm start` - Start production server

### Frontend

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Tech Stack

### Backend
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **express-validator** - Input validation

### Frontend
- **React** - UI library
- **Vite** - Build tool
- **React Router** - Routing
- **Axios** - HTTP client
- **TailwindCSS** - Styling
- **ESLint** - Code linting

## API Endpoints

- `GET /api/health` - Health check endpoint
- `GET /api/` - API information

## Development Guidelines

1. **Code Organization**: Follow the MVC pattern in the backend
2. **Component Structure**: Use functional components with hooks in React
3. **State Management**: Use Context API for global state
4. **Styling**: Use TailwindCSS utility classes
5. **Error Handling**: Always use try-catch blocks and proper error responses
6. **Environment Variables**: Never commit `.env` files

## Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## License

ISC
