# Room Planner

A modern, interactive room planning application built with React, TypeScript, and Node.js. Create detailed floor plans with an intuitive canvas-based interface, inspired by Canva's design tools. Draw shapes, add text, and save your room layouts with a powerful HTML5 Canvas implementation.

## 🚀 Features

### 🎨 Interactive Canvas Design
- **HTML5 Canvas**: High-performance drawing surface with custom rendering engine
- **Shape Tools**: Draw rectangles, circles, triangles, lines, and custom shapes
- **Text Tool**: Add labels and annotations to your floor plans
- **Room Tool**: Specialized tool for creating room boundaries
- **Fill Tool**: Apply colors and patterns to shapes

### 🛠️ Drawing Tools
- **Select Tool**: Click and drag to select and modify existing elements
- **Delete Tool**: Remove unwanted elements from your design
- **Color Picker**: Choose from a full spectrum of colors for your designs
- **Grid System**: Snap-to-grid functionality for precise alignment

### 💾 Plan Management
- **Save Plans**: Store your room layouts in MongoDB database
- **Load Plans**: Retrieve and continue working on saved designs
- **Delete Plans**: Remove unwanted plans from your collection
- **Plan List**: View and manage all your saved floor plans

### 🎯 User Experience
- **Intuitive Interface**: Clean, modern UI with organized toolbar sections
- **Real-time Updates**: See changes instantly as you draw
- **Responsive Design**: Works seamlessly across different screen sizes
- **Modal Dialogs**: User-friendly save and delete confirmations

## 🛠️ Technology Stack

### Frontend
- **React 18** - Modern UI library with hooks and functional components
- **TypeScript** - Type-safe JavaScript development
- **Vite** - Fast build tool and development server
- **HTML5 Canvas API** - Custom drawing engine and shape rendering
- **Axios** - HTTP client for API communication
- **React Color** - Color picker component for design tools

### Backend
- **Node.js** - JavaScript runtime environment
- **Express.js** - Web application framework
- **TypeScript** - Type-safe server-side development
- **Mongoose** - MongoDB object modeling and database operations
- **MongoDB** - NoSQL database for plan storage
- **CORS** - Cross-origin resource sharing support

### Development Tools
- **ESLint** - Code quality and consistency
- **Prettier** - Code formatting
- **Vitest** - Frontend testing framework
- **Jest** - Backend testing framework
- **Docker Compose** - Containerized development environment

### Infrastructure
- **Docker** - Containerization for consistent development and deployment
- **MongoDB** - Database service via Docker container
- **GitHub Actions** - CI/CD pipeline with automated testing

## 🏗️ Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Backend       │    │   MongoDB       │
│   (React + TS)  │◄──►│   (Node + TS)   │◄──►│   Database      │
│   Port: 3000    │    │   Port: 3001    │    │   Port: 27017   │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   HTML5 Canvas  │    │   Express API   │    │   Plan Storage  │
│   Drawing Engine│    │   REST Endpoints│    │   & Retrieval   │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 🧪 Testing

Run the test suite to ensure everything is working correctly:

```bash
# Run frontend tests
cd frontend
npm test

# Run backend tests
cd backend
npm test

# Run all tests via Docker
docker compose exec frontend npm test
docker compose exec backend npm test
```

## 🚀 Development Setup

### Prerequisites
- **Docker and Docker Compose**
- **Node.js 16+ and npm**

### Local Development

```bash
# Clone the repository
git clone git@github.com:pjholt1234/room-planner.git
cd room-planner

# Start the development environment
docker compose up -d

# Install dependencies (if needed)
docker compose exec frontend npm install
docker compose exec backend npm install

# Access the application
open http://localhost:3000
```

### Manual Setup (without Docker)

```bash
# Frontend setup
cd frontend
npm install
npm run dev

# Backend setup (in another terminal)
cd backend
npm install
npm run dev

# MongoDB setup
# Ensure MongoDB is running on localhost:27017
```

## 🔧 Configuration

### Environment Variables

#### Frontend (.env)
```
VITE_API_URL=http://localhost:3001
```

#### Backend (.env)
```
PORT=3001
MONGODB_URI=mongodb://localhost:27017/room-planner
CORS_ORIGIN=http://localhost:3000
```

### Docker Configuration
The application uses Docker Compose for containerized development:

- **Frontend**: React development server on port 3000
- **Backend**: Express API server on port 3001
- **MongoDB**: Database service on port 27017
- **Network**: Custom bridge network for service communication

## 📁 Project Structure

```
room-planner/
├── frontend/                 # React TypeScript application
│   ├── src/
│   │   ├── canvas/          # HTML5 Canvas implementation
│   │   │   ├── tools/       # Drawing tools (line, rectangle, etc.)
│   │   │   ├── shapes/      # Shape definitions and rendering
│   │   │   └── utilities/   # Canvas helper functions
│   │   ├── components/      # React components
│   │   ├── hooks/           # Custom React hooks
│   │   └── data-access/     # API communication layer
│   ├── tests/               # Frontend test files
│   └── package.json
├── backend/                  # Node.js Express API
│   ├── src/
│   │   ├── server/          # Express server and routes
│   │   ├── database/        # MongoDB models and connections
│   │   └── types/           # TypeScript type definitions
│   ├── tests/               # Backend test files
│   └── package.json
├── docker-compose.yml        # Development environment setup
└── README.md
```

## 🚀 Deployment

### Development
The application is containerized and ready for deployment:

```bash
# Build and start all services
docker compose up -d

# View logs
docker compose logs -f

# Stop services
docker compose down
```

### Production Considerations
- Configure production MongoDB instance
- Set up proper CORS origins
- Implement authentication if needed
- Configure reverse proxy (nginx)
- Set up SSL certificates
- Implement proper logging and monitoring
