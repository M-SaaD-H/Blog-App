import React from 'react'

function Button({
    children, // This is just the text of the button
    type = 'button',
    bgColor = 'bg-blue-700',
    textColor = 'text-white',
    className = '',
    ...props
}) {
  return (
    <button className={`px-4 py-2 rounded-lg ${bgColor} ${textColor} ${className}`} type={type} {...props}>
      { children }
    </button>
  )
}

export default Button
