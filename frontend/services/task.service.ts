import { CreateTaskPayload, Task, UpdateTaskPayload } from '@/types/task'

const API_URL = process.env.NEXT_PUBLIC_API_URL

export async function createTask(payload: CreateTaskPayload): Promise<Task> {
  const res = await fetch(`${API_URL}/tasks`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })

  if (!res.ok) {
    const error = await res.json()
    throw error
  }

  const data = await res.json()
  return data.data
}

export async function updateTask(id: number, payload: UpdateTaskPayload): Promise<Task> {
  const res = await fetch(`${API_URL}/tasks/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })

  if (!res.ok) {
    const error = await res.json()
    throw error
  }

  const data = await res.json()
  return data.data
}
