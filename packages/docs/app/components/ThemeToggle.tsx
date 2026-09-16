'use client'

import { MoonIcon, SunIcon } from 'lucide-react'
import { useTheme } from 'next-themes'
import * as React from 'react'
import { Button } from 'raditail'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)
  React.useEffect(() => setMounted(true), [])

  if (!mounted) {
    return (
      <Button
        aria-label="Toggle theme"
        variant="ghost"
        icon={<SunIcon className="h-4 w-4" aria-hidden />}
      />
    )
  }

  const isDark = theme === 'dark'

  return (
    <Button
      aria-label="Toggle theme"
      variant="ghost"
      icon={
        isDark ? (
          <SunIcon className="h-4 w-4" aria-hidden />
        ) : (
          <MoonIcon className="h-4 w-4" aria-hidden />
        )
      }
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
    />
  )
}
