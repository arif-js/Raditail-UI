import * as React from 'react'
import { XIcon } from 'lucide-react'
import {
  Toast,
  ToastAction,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
  type ToastProps,
  type ToastViewportProps,
} from '../toast/toast'

export interface ToastOptions {
  title?: React.ReactNode
  description?: React.ReactNode
  /** Render an action button inside the toast. */
  action?: {
    label: React.ReactNode
    /** Required by Radix for screen readers; describes what the action does. */
    altText: string
    onClick?: () => void
  }
  colorScheme?: ToastProps['colorScheme']
  /** Milliseconds before auto-dismiss. Overrides the `Toaster` default. */
  duration?: number
}

export interface ToastApi {
  /** Queue a toast. Returns its id, for `dismiss`. */
  toast: (options: ToastOptions) => number
  dismiss: (id: number) => void
  dismissAll: () => void
}

interface QueuedToast extends ToastOptions {
  id: number
}

const ToastContext = React.createContext<ToastApi | null>(null)

export interface ToasterProps {
  children?: React.ReactNode
  /** Where the stack is anchored. */
  position?: ToastViewportProps['position']
  /** Default auto-dismiss delay in milliseconds. */
  duration?: number
  /** Oldest toasts are dropped once the queue exceeds this. */
  max?: number
  className?: string
}

/**
 * Mount once near the root to enable `useToast`.
 *
 * Owns the `ToastProvider`, the queue and the `ToastViewport`, which is the
 * boilerplate every app otherwise rewrites.
 */
export function Toaster({
  children,
  position = 'bottom-right',
  duration = 5000,
  max = 3,
  className,
}: ToasterProps) {
  const [toasts, setToasts] = React.useState<QueuedToast[]>([])
  const nextId = React.useRef(0)

  const dismiss = React.useCallback((id: number) => {
    setToasts((current) => current.filter((entry) => entry.id !== id))
  }, [])

  const dismissAll = React.useCallback(() => setToasts([]), [])

  const toast = React.useCallback(
    (options: ToastOptions) => {
      const id = (nextId.current += 1)
      setToasts((current) => [...current, { ...options, id }].slice(-max))
      return id
    },
    [max]
  )

  const api = React.useMemo<ToastApi>(
    () => ({ toast, dismiss, dismissAll }),
    [toast, dismiss, dismissAll]
  )

  return (
    <ToastContext.Provider value={api}>
      <ToastProvider swipeDirection="right">
        {children}
        {toasts.map((entry) => (
          <Toast
            key={entry.id}
            open
            duration={entry.duration ?? duration}
            colorScheme={entry.colorScheme}
            onOpenChange={(open) => {
              if (!open) dismiss(entry.id)
            }}
          >
            <div className="flex-1 min-w-0">
              {entry.title ? <ToastTitle>{entry.title}</ToastTitle> : null}
              {entry.description ? (
                <ToastDescription>{entry.description}</ToastDescription>
              ) : null}
            </div>
            {entry.action ? (
              <ToastAction
                altText={entry.action.altText}
                onClick={entry.action.onClick}
              >
                {entry.action.label}
              </ToastAction>
            ) : null}
            <ToastClose aria-label="Dismiss notification">
              <XIcon className="h-4 w-4" aria-hidden />
            </ToastClose>
          </Toast>
        ))}
        <ToastViewport position={position} className={className} />
      </ToastProvider>
    </ToastContext.Provider>
  )
}

Toaster.displayName = 'Toaster'

/**
 * Access the toast queue. Requires a `Toaster` somewhere above this component.
 */
export function useToast(): ToastApi {
  const context = React.useContext(ToastContext)
  if (!context) {
    throw new Error(
      'useToast must be used within a <Toaster />. Render one near the root of your app.'
    )
  }
  return context
}
