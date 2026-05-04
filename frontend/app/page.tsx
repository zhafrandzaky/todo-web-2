'use client'
import { useState } from 'react'
import { Task } from '@/types/task'
import { DUMMY_TASKS } from '@/lib/dummy-data'
import { useTask } from '@/hooks/use-task'
import { Navbar } from '@/components/shared/navbar'
import { TaskForm } from '@/components/task/task-form'
import { TaskList } from '@/components/task/task-list'
import { ErrorDialog } from '@/components/shared/error-dialog'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>(DUMMY_TASKS)

  const { isLoading, error, handleCreate, handleUpdate, clearError } = useTask(
    (task) => setTasks((prev) => [task, ...prev]),
    (task) => setTasks((prev) => prev.map((t) => (t.id === task.id ? task : t))),
  )

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-3xl px-4 py-8">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <h1 className="text-xl font-semibold tracking-tight">My Tasks</h1>
            <Badge variant="secondary" className="text-xs">{tasks.length}</Badge>
          </div>
          <TaskForm onSubmit={handleCreate} isLoading={isLoading} />
        </div>
        <Separator className="mb-6" />
        <TaskList tasks={tasks} onEdit={handleUpdate} />
      </main>
      <ErrorDialog
        open={!!error}
        onClose={clearError}
        title={error?.title}
        errors={error?.errors}
      />
    </>
  )
}
