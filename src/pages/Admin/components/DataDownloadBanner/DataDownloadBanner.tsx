import './DataDownloadBanner.css'
import { Icon, Loader } from '@/components'
import { ActionState } from '@/hooks'
import { classList, varList } from '@/helpers'
import { useMemo } from 'react'

const SIZES = ['s', 's', 's', 'm', 'm', 'l']

const generateParticles = (count: number) =>
  Array.from({ length: count }, () => ({
    x: `${Math.random() * 100}%`,
    y: `${Math.random() * 100}%`,
    size: SIZES[Math.floor(Math.random() * SIZES.length)],
  }))

export interface DataDownloadBannerProps {
  actionState: ActionState
  onDownload: () => void
}

const DataDownloadBanner = ({
  actionState,
  onDownload,
}: DataDownloadBannerProps) => {
  const particles = useMemo(() => generateParticles(16), [])

  return (
    <button
      className={classList('cmp-data-download-banner', {
        downloading: actionState !== 'loading',
      })}
      title="Consultar datos"
      disabled={actionState !== 'ready'}
      onClick={onDownload}
    >
      {particles.map(({ x, y, size }, i) => (
        <div key={i} className={classList('particle-container', size)}>
          <div style={varList({ x, y })} />
        </div>
      ))}
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
}

export default DataDownloadBanner
