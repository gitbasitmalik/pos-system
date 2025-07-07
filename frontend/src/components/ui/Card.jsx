import { clsx } from "clsx"

export const Card = ({ children, className = "", ...props }) => {
  return (
    <div className={clsx("card", className)} {...props}>
      {children}
    </div>
  )
}

export const CardHeader = ({ children, className = "", ...props }) => {
  return (
    <div className={clsx("flex flex-col space-y-1.5 p-6", className)} {...props}>
      {children}
    </div>
  )
}

export const CardTitle = ({ children, className = "", ...props }) => {
  return (
    <h3 className={clsx("text-2xl font-semibold leading-none tracking-tight", className)} {...props}>
      {children}
    </h3>
  )
}

export const CardContent = ({ children, className = "", ...props }) => {
  return (
    <div className={clsx("p-6 pt-0", className)} {...props}>
      {children}
    </div>
  )
}
