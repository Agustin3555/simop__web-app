import './Section.css'
import { ReactNode } from 'react'

interface SectionProps {
  label?: string
  children: ReactNode
}

export const Section = ({ label, children }: SectionProps) => {
  return (
    <section className="cmp-section">
      {label && <small className="text">{label}</small>}
      {children}
    </section>
  )
}
