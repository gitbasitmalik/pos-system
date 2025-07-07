

import { clsx } from "clsx"

const Input = ({
  className = "",
  type = "text",
  placeholder,
  value,
  onChange,
  disabled = false,
  required = false,
  ...props
}) => {
  return (
    <input
      type={type}
      className={clsx("input", className)}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      disabled={disabled}
      required={required}
      {...props}
    />
  )
}

export default Input
