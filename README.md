# Todo App — Web Programming II

Simple todo list application built with Next.js and Laravel as a REST API.

## Tech Stack

| Layer      | Technology                                    |
|------------|-----------------------------------------------|
| Frontend   | Next.js 16, TypeScript, Tailwind v4, shadcn/ui |
| Backend    | Laravel 13 (REST API)                         |
| Database   | PostgreSQL (Railway)                          |
| Hosting FE | Vercel                                        |
| Hosting BE | Railway                                       |

## Getting Started

### Backend

```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate
php artisan serve
```

### Frontend

```bash
cd frontend
npm install
cp .env.example .env.local
npm run dev
```

## Environment Variables

### Frontend (`frontend/.env.local`)

| Variable              | Description              |
|-----------------------|--------------------------|
| `NEXT_PUBLIC_API_URL` | Laravel API base URL     |

### Backend (`backend/.env`)

| Variable      | Description              |
|---------------|--------------------------|
| `DB_CONNECTION` | `pgsql`                |
| `DB_HOST`       | PostgreSQL host          |
| `DB_PORT`       | PostgreSQL port          |
| `DB_DATABASE`   | Database name            |
| `DB_USERNAME`   | Database user            |
| `DB_PASSWORD`   | Database password        |

## API Endpoints

| Method | Endpoint           | Description              | Status      |
|--------|--------------------|--------------------------|-------------|
| POST   | `/api/tasks`       | Create a new task        | Done        |
| PUT    | `/api/tasks/{id}`  | Update an existing task  | Done        |
| GET    | `/api/tasks`       | List all tasks           | Coming soon |
| DELETE | `/api/tasks/{id}`  | Delete a task            | Coming soon |

## Team

| Member          | Branch                   |
|-----------------|--------------------------|
| @zhafrandzaky   | `feature/create-task`    |
| @gent4dp        | `feature/read-delete-task` |

## Git Workflow

- No direct push to `main`
- All features via Pull Request
- Each PR requires minimum 2 review comments before merge
