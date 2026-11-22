import './Nav.css'
import { useId } from 'react'
import { useSidebar } from '../../store'
import Icon from '@/components/Icon/Icon'
import { Sidebar } from '@/shared/components/Sidebar/Sidebar'
import { ReleaseNotesModal, Tree } from './components'
import FavoriteViews from '../FavoriteViews/FavoriteViews'
import {
  ViewSwitcher,
  ViewSwitcherProps,
} from '@/shared/components/ViewSwitcher/ViewSwitcher'
import { clsx } from '@/helpers'

interface HeaderProps {
  size?: 's' | 'm'
}

const Header = ({ size = 'm' }: HeaderProps) => {
  return (
    <header className={clsx(`ui-${size}`, size)}>
      <div className="logo">
        <Icon iconClass="fa-solid fa-tree-city" />
      </div>
      <h1>
        SIMOP
        {size === 'm' && (
          <strong className="text">
            Sistema Interno del Ministerio de Obras Públicas
          </strong>
        )}
      </h1>
    </header>
  )
}

const VIEWS: ViewSwitcherProps['views'] = [
  {
    key: 'tree',
    text: 'Secciones',
    component: <Tree />,
  },
  {
    key: 'favorites',
    text: 'Favoritos',
    component: <FavoriteViews />,
  },
]

const Nav = () => {
  const isOpen = useSidebar(s => s.isOpen)
  const close = useSidebar(s => s.close)
  const id = useId()

  const expandedLayout = (
    <>
      <Header />
      <ViewSwitcher
        name={id}
        defaultView="favorites"
        views={VIEWS}
        controlExpanded
      />
      <footer>
        <img src="/isologotipo-gobierno-ministerio.webp" />
        <ReleaseNotesModal />
      </footer>
    </>
  )

  const collapsedLayout = (
    <>
      <Header size="s" />
      <nav>
        <FavoriteViews small />
      </nav>
    </>
  )

  return (
    <Sidebar
      handlingClass="cmp-nav"
      {...{ isOpen, close, expandedLayout, collapsedLayout }}
    />
  )
}

export default Nav
