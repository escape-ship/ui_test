import React from 'react'

export interface NavigationMenuProps extends React.HTMLAttributes<HTMLUListElement> {}
export function NavigationMenu({ className = '', ...props }: NavigationMenuProps) {
  return <ul className={className} {...props} />
}

export interface NavigationMenuItemProps extends React.LiHTMLAttributes<HTMLLIElement> {}
export function NavigationMenuItem({ className = '', ...props }: NavigationMenuItemProps) {
  return <li className={className} {...props} />
}
