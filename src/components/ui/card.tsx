import React from 'react'

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}
export function Card({ className = '', ...props }: CardProps) {
  return <div className={className} {...props} />
}

export interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {}
export function CardContent({ className = '', ...props }: CardContentProps) {
  return <div className={className} {...props} />
}
