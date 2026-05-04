'use client'

import { useState } from 'react'
import { format } from 'date-fns'
import { CalendarDays } from 'lucide-react'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Calendar } from '@/components/ui/calendar'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface DatePickerProps {
  value: Date | undefined
  onChange: (date: Date | undefined) => void
  placeholder?: string
  disabled?: boolean
}

export function DatePicker({ value, onChange, placeholder = 'Pick a date', disabled }: DatePickerProps) {
  const [open, setOpen] = useState(false)

  return (
    <Popover open={open} onOpenChange={(isOpen) => setOpen(isOpen)}>
      <Button
        type="button"
        variant="outline"
        disabled={disabled}
        render={<PopoverTrigger />}
        className={cn(
          'w-full justify-start gap-2 font-normal',
          !value && 'text-muted-foreground'
        )}
      >
        <CalendarDays className="size-4 shrink-0" />
        {value ? format(value, 'MMM d, yyyy') : placeholder}
      </Button>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={value}
          onSelect={(date) => {
            onChange(date)
            setOpen(false)
          }}
        />
      </PopoverContent>
    </Popover>
  )
}
