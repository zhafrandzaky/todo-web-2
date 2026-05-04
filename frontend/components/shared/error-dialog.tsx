'use client'

import { AlertCircle } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'

interface ErrorDialogProps {
  open: boolean
  onClose: () => void
  title?: string
  message?: string
  errors?: string[]
}

export function ErrorDialog({ open, onClose, title = 'Something went wrong', message, errors }: ErrorDialogProps) {
  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <AlertCircle className="size-5 text-destructive" />
            <DialogTitle>{title}</DialogTitle>
          </div>
        </DialogHeader>
        <div className="flex flex-col gap-2">
          {message && <p className="text-sm text-muted-foreground">{message}</p>}
          {errors && errors.length > 0 && (
            <ul className="list-disc pl-4 text-sm text-muted-foreground space-y-1">
              {errors.map((err, i) => <li key={i}>{err}</li>)}
            </ul>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
