'use client'

import { useState, useEffect } from 'react'
import { Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { DatePicker } from '@/components/shared/date-picker'
import { TimePicker } from '@/components/shared/time-picker'
import { Task, UpdateTaskPayload, Priority, Status } from '@/types/task'
import { PRIORITY_OPTIONS, STATUS_OPTIONS } from '@/constants'
import { combineDateAndTime, extractDate, extractTime } from '@/lib/utils'

interface EditTaskFormProps {
  task: Task
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (data: UpdateTaskPayload) => void
  isLoading?: boolean
}

function buildInitialForm(task: Task) {
  return {
    title: task.title,
    description: task.description ?? '',
    priority: task.priority as Priority,
    status: task.status as Status,
    startDate: task.start_date ? extractDate(task.start_date) : undefined as Date | undefined,
    startTime: task.start_date ? extractTime(task.start_date) : '',
    dueDate: task.due_date ? extractDate(task.due_date) : undefined as Date | undefined,
    dueTime: task.due_date ? extractTime(task.due_date) : '',
  }
}

export function EditTaskForm({ task, open, onOpenChange, onSubmit, isLoading = false }: EditTaskFormProps) {
  const [form, setForm] = useState(() => buildInitialForm(task))

  useEffect(() => {
    setForm(buildInitialForm(task))
  }, [task])

  function set<K extends keyof ReturnType<typeof buildInitialForm>>(key: K, value: ReturnType<typeof buildInitialForm>[K]) {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    onSubmit({
      title: form.title || undefined,
      description: form.description || undefined,
      priority: form.priority,
      status: form.status,
      start_date: form.startDate && form.startTime
        ? combineDateAndTime(form.startDate, form.startTime)
        : undefined,
      due_date: form.dueDate && form.dueTime
        ? combineDateAndTime(form.dueDate, form.dueTime)
        : undefined,
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md" showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>Edit Task</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 pt-1">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="edit-title">Title</Label>
            <Input id="edit-title" value={form.title} onChange={(e) => set('title', e.target.value)} placeholder="Task title" />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="edit-description">Description</Label>
            <Textarea id="edit-description" value={form.description} onChange={(e) => set('description', e.target.value)} placeholder="Optional description" rows={3} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5">
              <Label>Priority</Label>
              <Select value={form.priority} onValueChange={(v) => v && set('priority', v as Priority)}>
                <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {PRIORITY_OPTIONS.map((o) => <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-1.5">
              <Label>Status</Label>
              <Select value={form.status} onValueChange={(v) => v && set('status', v as Status)}>
                <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {STATUS_OPTIONS.map((o) => <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5">
              <Label>Start Date</Label>
              <DatePicker value={form.startDate} onChange={(d) => set('startDate', d)} />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label>Start Time</Label>
              <TimePicker value={form.startTime} onChange={(t) => set('startTime', t)} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5">
              <Label>Due Date</Label>
              <DatePicker value={form.dueDate} onChange={(d) => set('dueDate', d)} />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label>Due Time</Label>
              <TimePicker value={form.dueTime} onChange={(t) => set('dueTime', t)} />
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-1">
            <Button type="button" variant="ghost" onClick={() => onOpenChange(false)}>Cancel</Button>
            <Button type="submit" disabled={isLoading} className="gap-1.5">
              {isLoading && <Loader2 className="size-4 animate-spin" />}
              Save Changes
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
