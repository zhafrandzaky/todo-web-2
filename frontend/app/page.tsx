'use client'
import { useState, useEffect } from 'react'
import { Task } from '@/types/task'
import { useTask } from '@/hooks/use-task'
import { Navbar } from '@/components/shared/navbar'
import { TaskForm } from '@/components/task/task-form'
import { TaskList } from '@/components/task/task-list'
import { ErrorDialog } from '@/components/shared/error-dialog'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([])

  const { isLoading, error, handleCreate, handleUpdate, handleFetch, handleDelete, clearError } = useTask(
    (task) => setTasks((prev) => [task, ...prev]),
    (task) => setTasks((prev) => prev.map((t) => t.id === task.id ? task : t)),
    (tasks) => setTasks(tasks),
    (id) => setTasks((prev) => prev.filter((t) => t.id !== id)),
    (tempId, realTask) => setTasks((prev) => prev.map((t) => t.id === tempId ? realTask : t)),
    (id) => setTasks((prev) => prev.filter((t) => t.id !== id)),
    (id) => tasks.find((t) => t.id === id),
  )

  useEffect(() => {
    handleFetch()
  }, [])

  return (
    <>
      <Navbar />
      <main className="max-w-3xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold">My Tasks</h1>
            <Badge variant="secondary">{tasks.length}</Badge>
          </div>
          <TaskForm onSubmit={handleCreate} isLoading={isLoading} />
        </div>
        <Separator className="mb-6" />
        <TaskList tasks={tasks} onEdit={handleUpdate} onDelete={handleDelete} />
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
