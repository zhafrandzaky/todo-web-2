'use client'

import { useState } from 'react'
import { format } from 'date-fns'
import { CalendarDays, Clock, Pencil, Trash2 } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { EditTaskForm } from './edit-task-form'
import { Task, UpdateTaskPayload } from '@/types/task'
import { PRIORITY_COLORS, PRIORITY_LABELS, STATUS_COLORS, STATUS_LABELS } from '@/constants'
import { cn } from '@/lib/utils'

interface TaskCardProps {
  task: Task
  onEdit: (id: number, data: UpdateTaskPayload) => void
}

function formatDate(iso: string): string {
  return format(new Date(iso), 'MMM d, yyyy, HH:mm')
}

const priorityBorder: Record<string, string> = {
  low: 'border-l-blue-500',
  medium: 'border-l-yellow-500',
  high: 'border-l-red-500',
}

export function TaskCard({ task, onEdit }: TaskCardProps) {
  const [editOpen, setEditOpen] = useState(false)

  return (
    <>
      <Card className={cn('border-l-[3px]', priorityBorder[task.priority])}>
        <CardContent className="flex flex-col gap-2.5">
          <div className="flex items-start justify-between gap-2">
            <p className="font-medium leading-snug">{task.title}</p>
            <Badge className={cn(PRIORITY_COLORS[task.priority], 'shrink-0')}>
              {PRIORITY_LABELS[task.priority]}
            </Badge>
          </div>

          <div className="flex items-center gap-2">
            <Badge className={STATUS_COLORS[task.status]}>
              {STATUS_LABELS[task.status]}
            </Badge>
            <span className="text-sm text-muted-foreground">{formatDate(task.updated_at)}</span>
          </div>

          {task.start_date && (
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <Clock className="size-3" />
              Started : {formatDate(task.start_date)}
            </span>
          )}

          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <CalendarDays className="size-3" />
            Due : {formatDate(task.due_date)}
          </span>

          {task.description && (
            <p className="line-clamp-2 text-xs text-muted-foreground">{task.description}</p>
          )}

          <div className="flex items-center justify-end gap-1 pt-0.5">
            <Button variant="ghost" size="icon-sm" onClick={() => setEditOpen(true)}>
              <Pencil className="size-3.5" />
              <span className="sr-only">Edit</span>
            </Button>
            <Button variant="ghost" size="icon-sm" className="text-destructive hover:text-destructive">
              <Trash2 className="size-3.5" />
              <span className="sr-only">Delete</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      <EditTaskForm
        task={task}
        open={editOpen}
        onOpenChange={setEditOpen}
        onSubmit={(data) => {
          onEdit(task.id, data)
          setEditOpen(false)
        }}
      />
    </>
  )
}
