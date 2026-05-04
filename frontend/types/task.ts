export type Priority = 'low' | 'medium' | 'high'
export type Status = 'todo' | 'in_progress' | 'done'

export interface Task {
  id: number
  title: string
  description: string | null
  priority: Priority
  status: Status
  start_date: string
  due_date: string
  created_at: string
  updated_at: string
}

export interface CreateTaskPayload {
  title: string
  description?: string
  priority: Priority
  status: Status
  start_date?: string
  due_date: string
}

export interface UpdateTaskPayload extends Partial<CreateTaskPayload> {}
