# Todo Management App

A full-stack task management application built as a Software Engineering Internship take-home assignment.

## Tech Stack

**Frontend:** React 19, Vite, TailwindCSS v4, shadcn/ui, TanStack Query, React Hook Form + Zod, Framer Motion, Axios

**Backend:** Node.js, Express 5, JSON file persistence (uuid)

## Live Demo

- **Frontend:** [https://todo-app-frontend-ecru-three.vercel.app](https://todo-app-frontend-ecru-three.vercel.app)
- **Backend API:** [https://todo-app-backend-mwhn.onrender.com/api/todos](https://todo-app-backend-mwhn.onrender.com/api/todos)

## Environment Variables

To run this project locally, you will need to add the following environment variables.

### Frontend (`client/.env`)
- `VITE_API_URL` (default: `http://localhost:5000/api`) - URL for the backend API

### Backend (`server/.env`)
- `PORT` (default: `5000`) - Port for the Express server
- `CLIENT_URL` (default: `http://localhost:5173`) - URL for the frontend application (used for CORS)
- `NODE_ENV` (default: `development`) - Environment mode

## Features

- Create, read, update, and delete tasks
- Priority levels: Low, Medium, High
- Status tracking: To do, In progress, Done
- Categories and comma-separated tags
- Due date support
- Live search by title and description
- Filter by status
- Sort by newest, oldest, or due date
- Summary statistics dashboard
- Animated task grid with skeleton loading states
- Responsive layout (mobile, tablet, desktop)

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### 1. Install server dependencies

```bash
cd server
npm install
```

### 2. Install client dependencies

```bash
cd ..
npm install
```

### 3. Configure environment

Copy `.env.example` to `.env` (already done by default):

```bash
cp .env.example .env
```

### 4. Start the backend

```bash
cd server
npm run dev
```

The API server runs on **http://localhost:5000**

### 5. Start the frontend

```bash
npm run dev
```

The app runs on **http://localhost:5173**

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/todos` | List all tasks |
| GET | `/api/todos/:id` | Get a task by ID |
| POST | `/api/todos` | Create a new task |
| PUT | `/api/todos/:id` | Update a task |
| DELETE | `/api/todos/:id` | Delete a task |
| GET | `/api/health` | Health check |

## Project Structure

```
to-do-app/
├── server/               # Express backend
│   ├── controllers/      # Route handlers
│   ├── routes/           # Express routers
│   ├── services/         # Business logic + JSON persistence
│   └── data/             # todos.json (auto-created)
└── src/                  # React frontend
    ├── components/       # Reusable UI components
    ├── hooks/            # TanStack Query hooks
    ├── lib/              # Utilities and shared constants
    ├── pages/            # Route-level page components
    └── services/         # Axios API client
```
