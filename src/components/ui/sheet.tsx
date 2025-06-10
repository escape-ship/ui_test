import React from 'react'

export interface SheetProps {
  open: boolean
  onOpenChange?: (open: boolean) => void
  children: React.ReactNode
}

export function Sheet({ open, onOpenChange, children }: SheetProps) {
  return <div>{open ? children : null}</div>
}

export interface SheetTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}
export const SheetTrigger = React.forwardRef<HTMLButtonElement, SheetTriggerProps>((props, ref) => {
  return <button ref={ref} {...props} />
})
SheetTrigger.displayName = 'SheetTrigger'

export interface SheetContentProps extends React.HTMLAttributes<HTMLDivElement> {
  side?: string
}
export const SheetContent = React.forwardRef<HTMLDivElement, SheetContentProps>(({ side, ...props }, ref) => {
  return <div ref={ref} {...props} />
})
SheetContent.displayName = 'SheetContent'

export default Sheet
