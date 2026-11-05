import './DataDownloadBanner.css'
import { Icon, Loader } from '@/components'
import { ActionState } from '@/hooks'
import { clsx } from '@/helpers'
import { Particles } from './components'

export interface DataDownloadBannerProps {
  particles?: boolean
  actionState: ActionState
  onDownload: () => void
}

const DataDownloadBanner = ({
  particles = true,
  actionState,
  onDownload,
}: DataDownloadBannerProps) => (
  <button
    className={clsx('cmp-data-download-banner', {
      downloading: actionState === 'loading',
    })}
    title="Cargar datos"
    disabled={actionState !== 'ready'}
    onClick={onDownload}
  >
    {particles && <Particles />}
    <div className="catalyst">
      <Icon
        iconClass="fa-solid fa-cloud-arrow-down"
        handlingClass={clsx({ active: actionState === 'ready' })}
      />
      <Loader handlingClass={clsx({ active: actionState === 'loading' })} />
      <Icon
        iconClass="fa-solid fa-xmark"
        handlingClass={clsx({ active: actionState === 'error' })}
      />
    </div>
  </button>
)

export default DataDownloadBanner
