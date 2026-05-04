# Todo App — Backend

Laravel REST API for the Todo App (Web Programming II project).

## Tech Stack

| Technology   | Purpose               |
|--------------|-----------------------|
| Laravel 13   | REST API framework    |
| PostgreSQL    | Primary database      |
| Railway      | Hosting & DB          |

## Folder Structure

```
backend/
├── app/
│   ├── Http/
│   │   ├── Controllers/Api/
│   │   │   └── TaskController.php   # store(), update()
│   │   ├── Requests/
│   │   │   ├── StoreTaskRequest.php
│   │   │   └── UpdateTaskRequest.php
│   │   └── Resources/
│   │       └── TaskResource.php
│   ├── Models/
│   │   └── Task.php
│   └── Services/
│       └── TaskService.php          # Business logic
├── database/
│   └── migrations/
├── routes/
│   └── api.php
└── .env
```

## Getting Started

```bash
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate
php artisan serve
```

## Environment Variables

| Variable      | Description                        |
|---------------|------------------------------------|
| `DB_CONNECTION` | `pgsql`                          |
| `DB_HOST`       | PostgreSQL host (e.g. Railway)   |
| `DB_PORT`       | PostgreSQL port (default `5432`) |
| `DB_DATABASE`   | Database name                    |
| `DB_USERNAME`   | Database user                    |
| `DB_PASSWORD`   | Database password                |

## API Endpoints

### POST `/api/tasks`

Create a new task.

**Request body**

```json
{
  "title": "string (required)",
  "description": "string (optional)",
  "priority": "low | medium | high (required)",
  "status": "todo | in_progress | done (required)",
  "start_date": "ISO 8601 (optional)",
  "due_date": "ISO 8601 (required)"
}
```

**Response `201`**

```json
{
  "data": {
    "id": 1,
    "title": "...",
    "description": "...",
    "priority": "...",
    "status": "...",
    "start_date": "...",
    "due_date": "...",
    "created_at": "...",
    "updated_at": "..."
  }
}
```

---

### PUT `/api/tasks/{id}`

Update an existing task. All fields are optional.

**Request body** — same fields as POST, all optional

**Response `200`** — same structure as POST

---

### GET `/api/tasks` _(coming soon)_

### DELETE `/api/tasks/{id}` _(coming soon)_

## Branch

`feature/create-task`
