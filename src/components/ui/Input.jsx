import { useState } from 'react'

export default function Input({ label, ...props }) {
  const [focused, setFocused] = useState(false)
  return (
    <label>
      {label && <div>{label}</div>}
      <input
        {...props}
        onFocus={(e) => { setFocused(true); props.onFocus?.(e) }}
        onBlur={(e)  => { setFocused(false); props.onBlur?.(e) }}
      />
    </label>
  )
}