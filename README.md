# Todo App — Web Programming II

Simple todo list application built with Next.js and Laravel.

## Tech Stack
| Layer      | Technology                                   |
|------------|----------------------------------------------|
| Frontend   | Next.js, TypeScript, Tailwind CSS, shadcn/ui |
| Backend    | Laravel (REST API)                           |
| Database   | PostgreSQL (Railway)                         |
| Hosting FE | Vercel                                       |
| Hosting BE | Railway                                      |

## Getting Started

### Backend
```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
php artisan serve
```

### Frontend
```bash
cd frontend
npm install
cp .env.example .env.local
npm run dev
```

## Team
| Name        | Branch                    |
|-------------|---------------------------|
| @zhafrandzaky | feature/create-task       |
| @gent4dp      | feature/read-delete-task  |

## Git Workflow
- No direct push to main
- All features via Pull Request
- Each PR requires minimum 2 review comments before merge
