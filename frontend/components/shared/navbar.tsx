import { CheckSquare } from 'lucide-react'
import { ThemeToggle } from './theme-toggle'

export function Navbar() {
  return (
    <header className="sticky top-0 z-10 border-b bg-background/80 backdrop-blur-sm">
      <div className="mx-auto flex h-14 max-w-3xl items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <CheckSquare className="size-5" />
          <span className="font-semibold tracking-tight">Todo App</span>
        </div>
        <ThemeToggle />
      </div>
    </header>
  )
}
