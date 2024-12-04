import './Nav.css'
import { useCallback, useState } from 'react'
import { Button } from '@/components'
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
        {TREE.map(section => (
          <Section
            key={section.title || String(section.viewKey)}
            {...section}
          />
        ))}
      </nav>
    </div>
  )
}

export default Nav
