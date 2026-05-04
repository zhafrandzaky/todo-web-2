'use client'

import { useState } from 'react'
import { Clock } from 'lucide-react'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface TimePickerProps {
  value: string | undefined
  onChange: (time: string) => void
  placeholder?: string
  disabled?: boolean
}

const HOURS = Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, '0'))
const MINUTES = Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, '0'))

export function TimePicker({ value, onChange, placeholder = 'Pick a time', disabled }: TimePickerProps) {
  const [open, setOpen] = useState(false)
  const [pendingHour, setPendingHour] = useState<string | null>(null)

  const selectedHour = value?.split(':')[0] ?? null
  const selectedMinute = value?.split(':')[1] ?? null
  const activeHour = pendingHour ?? selectedHour

  function handleHourClick(h: string) {
    setPendingHour(h)
  }

  function handleMinuteClick(m: string) {
    const h = pendingHour ?? selectedHour ?? '00'
    onChange(`${h}:${m}`)
    setOpen(false)
    setPendingHour(null)
  }

  function handleOpenChange(isOpen: boolean) {
    setOpen(isOpen)
    if (!isOpen) setPendingHour(null)
  }

  return (
    <Popover open={open} onOpenChange={handleOpenChange}>
      <Button
        type="button"
        variant="outline"
        disabled={disabled}
        render={<PopoverTrigger />}
        className={cn('w-full justify-start gap-2 font-normal', !value && 'text-muted-foreground')}
      >
        <Clock className="size-4 shrink-0" />
        {value ?? placeholder}
      </Button>
      <PopoverContent className="w-auto p-2" align="start">
        <div className="flex items-stretch gap-1">
          <div className="flex h-48 flex-col overflow-y-auto">
            {HOURS.map((h) => (
              <button
                key={h}
                type="button"
                onClick={() => handleHourClick(h)}
                className={cn(
                  'rounded-md px-3 py-1 text-left text-sm hover:bg-accent hover:text-accent-foreground',
                  h === activeHour && 'bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground'
                )}
              >
                {h}
              </button>
            ))}
          </div>
          <div className="flex items-center px-1 text-sm font-medium text-muted-foreground">:</div>
          <div className="flex h-48 flex-col overflow-y-auto">
            {MINUTES.map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => handleMinuteClick(m)}
                className={cn(
                  'rounded-md px-3 py-1 text-left text-sm hover:bg-accent hover:text-accent-foreground',
                  m === selectedMinute && !pendingHour && 'bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground'
                )}
              >
                {m}
              </button>
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
