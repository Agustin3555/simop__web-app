import './FallbackBanner.css'
import { ReactNode } from 'react'

interface FallbackBannerProps {
  children: ReactNode
}

const FallbackBanner = ({ children }: FallbackBannerProps) => (
  <div className="cmp-fallback-banner">
    <p className="text">{children}</p>
  </div>
)

export default FallbackBanner
