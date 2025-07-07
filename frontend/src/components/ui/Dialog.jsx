

import { useState, createContext, useContext, useEffect } from "react"
import { clsx } from "clsx"
import { X } from "lucide-react"

const DialogContext = createContext()

export const Dialog = ({ children, open, onOpenChange }) => {
  const [isOpen, setIsOpen] = useState(open || false)

  useEffect(() => {
    if (open !== undefined) {
      setIsOpen(open)
    }
  }, [open])

  const handleOpenChange = (newOpen) => {
    setIsOpen(newOpen)
    if (onOpenChange) onOpenChange(newOpen)
  }

  return (
    <DialogContext.Provider value={{ isOpen, setIsOpen: handleOpenChange }}>
      {children}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="fixed inset-0 bg-black/50" onClick={() => handleOpenChange(false)} />
          <div className="relative z-50 max-w-lg w-full mx-4">{children}</div>
        </div>
      )}
    </DialogContext.Provider>
  )
}

export const DialogTrigger = ({ children, asChild, ...props }) => {
  const { setIsOpen } = useContext(DialogContext)

  if (asChild) {
    return <div onClick={() => setIsOpen(true)}>{children}</div>
  }

  return (
    <button onClick={() => setIsOpen(true)} {...props}>
      {children}
    </button>
  )
}

export const DialogContent = ({ children, className = "", ...props }) => {
  const { isOpen, setIsOpen } = useContext(DialogContext)

  if (!isOpen) return null

  return (
    <div
      className={clsx(
        "relative bg-white rounded-lg border border-gray-200 shadow-lg p-6 max-h-[90vh] overflow-y-auto",
        className,
      )}
      {...props}
    >
      {children}
      <button
        onClick={() => setIsOpen(false)}
        className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-white transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-gray-950 focus:ring-offset-2"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  )
}

export const DialogHeader = ({ children, className = "", ...props }) => {
  return (
    <div className={clsx("flex flex-col space-y-1.5 text-center sm:text-left mb-4", className)} {...props}>
      {children}
    </div>
  )
}

export const DialogTitle = ({ children, className = "", ...props }) => {
  return (
    <h2 className={clsx("text-lg font-semibold leading-none tracking-tight", className)} {...props}>
      {children}
    </h2>
  )
}
