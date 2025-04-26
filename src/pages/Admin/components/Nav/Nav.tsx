import './Nav.css'
import { useCallback, useState } from 'react'
import { Button2, ExternalLink } from '@/components'
import { Section } from './components'
import { TREE } from '../../constants/navTree.const'
import { classList } from '@/helpers'

const Nav = () => {
  const [open, setOpen] = useState(false)

  const closeNav = useCallback(() => setOpen(false), [])
  const toggleHandleClick = useCallback(() => setOpen(prev => !prev), [])
  const backdropHandleClick = useCallback(() => closeNav(), [])

  return (
    <div className={classList('cmp-nav', { open })}>
      <button
        className="backdrop"
        title="Cerrar"
        onClick={backdropHandleClick}
      />
      <Button2
        title={open ? 'Cerrar' : 'Abrir'}
        faIcon="fa-solid fa-bars-staggered"
        type="secondary"
        onAction={toggleHandleClick}
      />
      <nav>
        <div className="tree">
          {TREE.map(section => (
            <Section
              key={section.title || section.scheme?.title.plural}
              {...section}
              {...{ closeNav }}
            />
          ))}
        </div>
        <ExternalLink
          title="Manual"
          faIcon="fa-solid fa-book"
          url="https://almondine-week-483.notion.site/SIMOP-Manual-del-Usuario-1528314303d88055a9c1da4222bea187"
        />
      </nav>
    </div>
  )
}

export default Nav
