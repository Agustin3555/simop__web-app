import './Nav.css'
import { useState } from 'react'
import { useNavState } from '../../hooks'
import { SegmentedControl } from '..'
import { SegmentedControlProps } from '../SegmentedControl/SegmentedControl'
import { Tree } from './components'

type ViewMode = 'tree' | 'favorites'

const VIEW_MODES_OPTIONS: SegmentedControlProps<ViewMode>['options'] = [
  { value: 'tree', text: 'Secciones', faIcon: 'fa-solid fa-bars-staggered' },
  { value: 'favorites', text: 'Favoritos', faIcon: 'fa-solid fa-star' },
]

const Nav = () => {
  const [viewMode, setViewMode] = useState<ViewMode>('favorites')
  const { closeNav } = useNavState()

  return (
    <div className="cmp-nav">
      <button className="backdrop" title="Cerrar" onClick={closeNav} />
      <div className="layout">
        <header>
          <img src="/isologotipo-gobierno-ministerio.webp" />
          <small>v1.0.0</small>
        </header>
        <div className="content">
          <SegmentedControl
            name="viewMode"
            selected={viewMode}
            setSelected={setViewMode}
            options={VIEW_MODES_OPTIONS}
          />
          <nav data-view-mode={viewMode}>
            <Tree />
            {/* <FavoriteViews /> */}
          </nav>
        </div>
      </div>
    </div>
  )
}

export default Nav
