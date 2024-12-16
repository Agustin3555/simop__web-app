import './Nav.css'
import { useCallback, useState } from 'react'
import { Button, ExternalLink } from '@/components'
import { Section } from './components'
import { TREE } from '../../constants'
import { classList } from '@/helpers'

const Nav = () => {
  const [open, setOpen] = useState(false)

  const toggleHandleClick = useCallback(() => setOpen(prev => !prev), [])
  const backdropHandleClick = useCallback(() => setOpen(false), [])

  return (
    <div className={classList('cmp-nav', { open })}>
      <button
        className="backdrop"
        title="Cerrar"
        onClick={backdropHandleClick}
      />
      <Button
        title={open ? 'Cerrar' : 'Abrir'}
        faIcon="fa-solid fa-bars-staggered"
        hideText
        _type="secondary"
        onClick={toggleHandleClick}
      />
      <nav>
        <div className="tree">
          {TREE.map(section => (
            <Section
              key={section.title || String(section.viewKey)}
              {...section}
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
