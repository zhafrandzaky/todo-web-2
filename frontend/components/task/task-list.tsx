import { ClipboardList } from 'lucide-react'
import { TaskCard } from './task-card'
import { Task, UpdateTaskPayload } from '@/types/task'

interface TaskListProps {
  tasks: Task[]
  onEdit: (id: number, data: UpdateTaskPayload) => void
}

export function TaskList({ tasks, onEdit }: TaskListProps) {
  if (tasks.length === 0) {
    return (
      <div className="flex flex-col items-center gap-3 py-20 text-center">
        <ClipboardList className="size-12 text-muted-foreground/40" />
        <div>
          <p className="font-medium text-muted-foreground">No tasks yet</p>
          <p className="text-sm text-muted-foreground/60">Add your first task to get started</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-3">
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} onEdit={onEdit} />
      ))}
    </div>
  )
}
