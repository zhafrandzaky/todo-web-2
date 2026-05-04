import { Priority, Status } from '@/types/task'

export const PRIORITY_OPTIONS: { label: string; value: Priority }[] = [
  { label: 'Low', value: 'low' },
  { label: 'Medium', value: 'medium' },
  { label: 'High', value: 'high' },
]

export const STATUS_OPTIONS: { label: string; value: Status }[] = [
  { label: 'Todo', value: 'todo' },
  { label: 'In Progress', value: 'in_progress' },
  { label: 'Done', value: 'done' },
]

export const PRIORITY_COLORS: Record<Priority, string> = {
  low: 'bg-blue-500/15 text-blue-400 border-blue-500/20',
  medium: 'bg-yellow-500/15 text-yellow-400 border-yellow-500/20',
  high: 'bg-red-500/15 text-red-400 border-red-500/20',
}

export const STATUS_COLORS: Record<Status, string> = {
  todo: 'bg-zinc-500/15 text-zinc-400 border-zinc-500/20',
  in_progress: 'bg-purple-500/15 text-purple-400 border-purple-500/20',
  done: 'bg-green-500/15 text-green-400 border-green-500/20',
}

export const STATUS_LABELS: Record<Status, string> = {
  todo: 'Todo',
  in_progress: 'In Progress',
  done: 'Done',
}

export const PRIORITY_LABELS: Record<Priority, string> = {
  low: 'Low',
  medium: 'Medium',
  high: 'High',
}
