import type { ReactNode } from 'react'

type NavLinkProps = {
  to: string
  className?: string
  children: ReactNode
}

export const NavLink = ({ to, className, children }: NavLinkProps) => {
  return (
    <a href={to} className={className}>
      {children}
    </a>
  )
}
