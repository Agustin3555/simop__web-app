import './DataDownloadBanner.css'
import { Icon, Loader } from '@/components'
import { ActionState } from '@/hooks'
import { classList } from '@/helpers'
import { Particles } from './components'

export interface DataDownloadBannerProps {
  particles: boolean
  actionState: ActionState
  onDownload: () => void
}

const DataDownloadBanner = ({
  particles = true,
  actionState,
  onDownload,
}: DataDownloadBannerProps) => (
  <button
    className={classList('cmp-data-download-banner', {
      downloading: actionState === 'loading',
    })}
    title="Cargar datos"
    disabled={actionState !== 'ready'}
    onClick={onDownload}
  >
    {particles && <Particles />}
    <div className="catalyst">
      <Icon
        faIcon="fa-solid fa-cloud-arrow-down"
        handlingClass={classList({ active: actionState === 'ready' })}
      />
      <Loader
        handlingClass={classList({ active: actionState === 'loading' })}
      />
      <Icon
        faIcon="fa-solid fa-xmark"
        handlingClass={classList({ active: actionState === 'error' })}
      />
    </div>
  </button>
)

export default DataDownloadBanner
