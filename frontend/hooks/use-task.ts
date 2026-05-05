'use client'
import { useState } from 'react'
import { toast } from 'sonner'
import { createTask, updateTask, getTasks, deleteTask } from '@/services/task.service'
import { Task, CreateTaskPayload, UpdateTaskPayload } from '@/types/task'

export function useTask(
  onCreateSuccess: (task: Task) => void,
  onUpdateSuccess: (task: Task) => void,
  onDeleteSuccess: (id: number) => void,
) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<{ title: string; errors: string[] } | null>(null)

  const handleFetch = async (): Promise<Task[]> => {
    setIsLoading(true)
    try {
      const tasks = await getTasks()
      return tasks
    } catch (err: unknown) {
      setError(parseError(err))
      return []
    } finally {
      setIsLoading(false)
    }
  }

  const handleCreate = async (payload: CreateTaskPayload) => {
    setIsLoading(true)
    try {
      const task = await createTask(payload)
      onCreateSuccess(task)
      toast.success('Task created successfully')
    } catch (err: unknown) {
      setError(parseError(err))
    } finally {
      setIsLoading(false)
    }
  }

  const handleUpdate = async (id: number, payload: UpdateTaskPayload) => {
    setIsLoading(true)
    try {
      const task = await updateTask(id, payload)
      onUpdateSuccess(task)
      toast.success('Task updated successfully')
    } catch (err: unknown) {
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