# Todo Management App

A full-stack task management application built as a Software Engineering Internship take-home assignment.

## Tech Stack

**Frontend:** React 19, Vite, TailwindCSS v4, shadcn/ui, TanStack Query, React Router, React Hook Form + Zod, Framer Motion, Axios

**Backend:** Node.js, Express 5, JSON file persistence (uuid)

## Live Demo

- **Frontend:** [https://todo-app-frontend-ecru-three.vercel.app](https://todo-app-frontend-ecru-three.vercel.app)
- **Backend API:** [https://todo-app-backend-mwhn.onrender.com/api/todos](https://todo-app-backend-mwhn.onrender.com/api/todos)

## Environment Variables

To run this project locally, you will need to add the following environment variables.

### Frontend (`client/.env` or `.env` in root for Vite)
- `VITE_API_URL` (default: `http://localhost:5000/api`) - URL for the backend API

### Backend (`server/.env`)
- `PORT` (default: `5000`) - Port for the Express server
- `CLIENT_URL` (default: `http://localhost:5173`) - URL for the frontend application (used for CORS)
- `NODE_ENV` (default: `development`) - Environment mode

## Features

### Core Features
- ✓ **Task Management** — Create, read, update, and delete tasks with comprehensive details.
- ✓ **Task Attributes** — Set priority levels (Low, Medium, High), status (To do, In progress, Done), categories, and tags.
- ✓ **Due Dates** — Assign and track due dates for time-sensitive tasks.
- ✓ **Advanced Search** — Instantly search and filter tasks by title or description in real-time.
- ✓ **Filtering & Sorting** — Filter tasks by status and sort them by newest, oldest, or due date.
- ✓ **Dashboard Statistics** — View real-time summary statistics of total, pending, in-progress, and completed tasks.

### UI/UX Features
- ✓ **Modern Design** — Premium SaaS-like interface built with TailwindCSS and shadcn/ui components.
- ✓ **Responsive Layout** — Fully responsive design optimized for mobile, tablet, and desktop viewing.
- ✓ **Animations & Transitions** — Smooth list transitions and task grid animations using Framer Motion.
- ✓ **Skeleton Loading** — Animated skeleton loaders for a seamless user experience during API calls.
- ✓ **Detailed View** — Dedicated task detail page for focused viewing of individual tasks.

### Backend Features
- ✓ **RESTful API** — Express.js backend with clean controller and route architecture.
- ✓ **JSON Persistence** — Lightweight file-based data storage using `todos.json` with UUID generation.
- ✓ **CORS Configured** — Secure cross-origin resource sharing setup for seamless frontend integration.
- ✓ **Health Monitoring** — Dedicated `/api/health` endpoint for uptime checking and deployment verification.

### Technical Features
- ✓ **State Management** — Asynchronous data fetching, caching, and mutation using TanStack Query.
- ✓ **Form Validation** — Robust client-side form validation using React Hook Form and Zod.
- ✓ **Client-Side Routing** — Seamless navigation between views using React Router.

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

```text
├── server/               # Express backend
│   ├── controllers/      # Route handlers
│   ├── routes/           # Express routers
│   ├── services/         # Business logic + JSON persistence
│   └── data/             # todos.json (auto-created)
├── src/                  # React frontend
│   ├── components/       # Reusable UI components
│   ├── hooks/            # TanStack Query hooks
│   ├── lib/              # Utilities and shared constants
│   ├── pages/            # Route-level page components
│   └── services/         # Axios API client
```

## Known Limitations

- **Ephemeral Storage**: JSON file persistence is used for simplicity, but on platforms like Render (free tier), the ephemeral file system will reset the `todos.json` data on every deploy or sleep cycle.
- **No Authentication**: The application is designed for single-tenant use and lacks authentication; anyone can view or modify tasks.
- **No Pagination**: All tasks are fetched at once, which is suitable for a small number of tasks but not scalable for large datasets.

## Future Improvements

- **Database Migration**: Move from JSON file storage to a robust relational database (e.g., PostgreSQL) or NoSQL database (e.g., MongoDB).
- **User Authentication**: Implement JWT-based authentication to support multiple users with private, isolated task lists.
- **Kanban Board**: Introduce a drag-and-drop Kanban view for moving tasks intuitively between status columns.
- **Pagination**: Implement pagination in both the backend API and frontend UI for better scalability.
- **Dark Mode**: Add a dark theme toggle for enhanced user accessibility and preference.
