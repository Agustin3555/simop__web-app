import './CardPage.css'
import { ReactNode } from 'react'

interface CardPageProps {
  children: ReactNode
}

const CardPage = ({ children }: CardPageProps) => (
  <div className="cmp-card-page">{children}</div>
)

export default CardPage
