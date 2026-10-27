import './Nav.css'
import { useState } from 'react'
import SegmentedControl, {
  SegmentedControlProps,
} from '../SegmentedControl/SegmentedControl'
import { ReleaseNotesModal, Tree } from './components'
import { useNavState } from '../../hooks/useNavState.hook'
import FavoriteViews from '../FavoriteViews/FavoriteViews'

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
          <ReleaseNotesModal />
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
            <FavoriteViews />
          </nav>
        </div>
        <footer></footer>
      </div>
    </div>
  )
}

export default Nav
