import React from 'react'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'ghost' | 'outline' | 'default'
  size?: 'icon' | 'default'
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ variant = 'default', size = 'default', className = '', ...props }, ref) => {
  return <button ref={ref} className={className} {...props} />
})
Button.displayName = 'Button'

export { Button }
export default Button
