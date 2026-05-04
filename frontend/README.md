# Todo App — Frontend

Next.js frontend for the Todo App (Web Programming II project).

## Tech Stack

| Technology    | Purpose                          |
|---------------|----------------------------------|
| Next.js 16    | React framework (App Router)     |
| TypeScript    | Type safety                      |
| Tailwind v4   | Utility-first styling            |
| shadcn/ui     | Accessible UI components         |
| Lucide React  | Icons                            |
| next-themes   | Dark / light mode                |
| sonner        | Toast notifications              |
| date-fns      | Date formatting                  |
| react-day-picker | Date picker UI                |

## Folder Structure

```
frontend/
├── app/                  # Next.js App Router
│   ├── layout.tsx        # Root layout (theme, toaster)
│   └── page.tsx          # Main page
├── components/
│   ├── shared/           # Reusable layout components
│   │   ├── navbar.tsx
│   │   ├── theme-toggle.tsx
│   │   ├── date-picker.tsx
│   │   ├── time-picker.tsx
│   │   └── error-dialog.tsx
│   ├── task/             # Task-specific components
│   │   ├── task-form.tsx
│   │   ├── edit-task-form.tsx
│   │   ├── task-list.tsx
│   │   └── task-card.tsx
│   └── ui/               # shadcn/ui primitives
├── hooks/
│   └── use-task.ts       # API call logic, loading/error state
├── services/
│   └── task.service.ts   # fetch wrappers for the Laravel API
├── types/
│   └── task.ts           # Task, CreateTaskPayload, UpdateTaskPayload
├── constants/
│   └── index.ts          # Priority/status labels and colours
├── lib/
│   └── utils.ts          # cn(), date helpers
└── .env.local            # Environment variables
```

## Getting Started

```bash
npm install
cp .env.example .env.local   # then fill in NEXT_PUBLIC_API_URL
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment Variables

| Variable              | Example                        | Description          |
|-----------------------|--------------------------------|----------------------|
| `NEXT_PUBLIC_API_URL` | `http://localhost:8000/api`    | Laravel API base URL |

## Pages & Components

### Pages

| Route | Component   | Description                    |
|-------|-------------|--------------------------------|
| `/`   | `page.tsx`  | Task list with create/edit UI  |

### Key Components

| Component        | Description                                            |
|------------------|--------------------------------------------------------|
| `TaskForm`       | Dialog to create a new task                            |
| `EditTaskForm`   | Dialog to edit an existing task                        |
| `TaskList`       | Renders the list of `TaskCard` items                   |
| `TaskCard`       | Displays a single task with edit action                |
| `ErrorDialog`    | Shows API validation or network errors                 |
| `Navbar`         | Top navigation with theme toggle                       |

## Branch

`feature/create-task`
