import './Header.css'
import { useNavState } from '../../hooks'
import { Button, ExternalLink } from '@/components'

const Header = () => {
  const { isOpen, toggleNav } = useNavState()

  return (
    <div className="cmp-header">
      <Button
        title={isOpen ? 'Cerrar' : 'Abrir'}
        faIcon="fa-solid fa-mattress-pillow"
        size="m"
        onAction={toggleNav}
      />
      <ExternalLink
        title="Manual"
        faIcon="fa-solid fa-book"
        url="https://almondine-week-483.notion.site/SIMOP-Manual-del-Usuario-1528314303d88055a9c1da4222bea187"
      />
    </div>
  )
}

export default Header
