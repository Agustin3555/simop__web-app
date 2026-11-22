import './Header.css'
import { useSidebar } from '../../store'
import { Button } from '@/shared/components/Button/Button'
import { ExternalLink } from '@/components'
import { ConfigDropdown } from './components'

const Header = () => {
  const isOpen = useSidebar(s => s.isOpen)
  const toggle = useSidebar(s => s.toggle)

  return (
    <div className="cmp-header">
      <div className="left">
        <Button
          title={isOpen ? 'Cerrar' : 'Abrir'}
          iconClass="fa-solid fa-mattress-pillow"
          onAction={toggle}
        />
      </div>
      <div className="right">
        <ExternalLink
          title="Manual"
          iconClass="fa-solid fa-book"
          url="https://almondine-week-483.notion.site/SIMOP-Manual-del-Usuario-1528314303d88055a9c1da4222bea187"
        />
        <ConfigDropdown />
      </div>
    </div>
  )
}

export default Header
