'use client'
import { useState } from 'react'
import { toast } from 'sonner'
import { createTask, updateTask, getTasks, deleteTask } from '@/services/task.service'
import { Task, CreateTaskPayload, UpdateTaskPayload } from '@/types/task'

export function useTask(
  onCreateSuccess: (task: Task) => void,
  onUpdateSuccess: (task: Task) => void,
  onFetchSuccess: (tasks: Task[]) => void,
  onDeleteSuccess: (id: number) => void,
  onReplaceTask: (tempId: number, realTask: Task) => void,
  onRemoveTask: (id: number) => void,
  getTaskById: (id: number) => Task | undefined,
) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<{ title: string; errors: string[] } | null>(null)

  const handleFetch = async (): Promise<void> => {
    setIsLoading(true)
    try {
      const tasks = await getTasks()
      onFetchSuccess(tasks)
    } catch (err: unknown) {
      setError(parseError(err))
    } finally {
      setIsLoading(false)
    }
  }

  const handleCreate = async (payload: CreateTaskPayload) => {
    const now = new Date().toISOString()
    const tempTask: Task = {
      id: -Date.now(),
      title: payload.title,
      description: payload.description ?? null,
      priority: payload.priority,
      status: payload.status,
      start_date: payload.start_date ?? now,
      due_date: payload.due_date,
      created_at: now,
      updated_at: now,
    }
    onCreateSuccess(tempTask)
    setIsLoading(true)
    try {
      const realTask = await createTask(payload)
      onReplaceTask(tempTask.id, realTask)
      toast.success('Task created successfully')
    } catch (err: unknown) {
      onRemoveTask(tempTask.id)
      setError(parseError(err))
    } finally {
      setIsLoading(false)
    }
  }

  const handleUpdate = async (id: number, payload: UpdateTaskPayload) => {
    const previousTask = getTaskById(id)
    if (previousTask) {
      const optimisticTask: Task = {
        ...previousTask,
        title: payload.title ?? previousTask.title,
        description: payload.description !== undefined ? payload.description : previousTask.description,
        priority: payload.priority ?? previousTask.priority,
        status: payload.status ?? previousTask.status,
        start_date: payload.start_date ?? previousTask.start_date,
        due_date: payload.due_date ?? previousTask.due_date,
        updated_at: new Date().toISOString(),
      }
      onUpdateSuccess(optimisticTask)
    }
    setIsLoading(true)
    try {
      const realTask = await updateTask(id, payload)
      onReplaceTask(id, realTask)
      toast.success('Task updated successfully')
    } catch (err: unknown) {
      if (previousTask) onUpdateSuccess(previousTask)
      setError(parseError(err))
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (id: number) => {
    setIsLoading(true)
    try {
      await deleteTask(id)
      onDeleteSuccess(id)
      toast.success('Task deleted successfully')
    } catch (err: unknown) {
      setError(parseError(err))
    } finally {
      setIsLoading(false)
    }
  }

  const clearError = () => setError(null)

  return {
    isLoading,
    error,
    handleFetch,
    handleCreate,
    handleUpdate,
    handleDelete,
    clearError,
  }
}

function parseError(err: unknown): { title: string; errors: string[] } {
  if (err instanceof TypeError) {
    return {
      title: 'Connection Failed',
      errors: ['Unable to connect to the server. Please check your connection and try again.'],
    }
  }

  if (typeof err === 'object' && err !== null) {
    const e = err as Record<string, unknown>

    if (e.errors && typeof e.errors === 'object') {
      const messages = Object.values(e.errors as Record<string, string[]>).flat()
      return { title: 'Validation Error', errors: messages }
    }

    if (typeof e.message === 'string') {
      return { title: 'Something went wrong', errors: [e.message] }
    }
  }

  return {
    title: 'Something went wrong',
    errors: ['An unexpected error occurred. Please try again.'],
  }
}
