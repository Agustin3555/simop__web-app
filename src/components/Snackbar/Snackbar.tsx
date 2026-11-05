import './Snackbar.css'
import { useAppStore } from '@/store/config'
import { Icon } from '..'
import { EXIT_TIME, ToastType } from '@/store/slices'
import { clsx, varList } from '@/helpers'

const iconClassMatching: Record<ToastType, string> = {
  info: 'fa-solid fa-circle-exclamation',
  warning: 'fa-solid fa-triangle-exclamation',
  error: 'fa-solid fa-circle-xmark',
  success: 'fa-solid fa-circle-check',
}

const Snackbar = () => {
  const toasts = useAppStore(s => s.toasts)

  return (
    <div className="cmp-snackbar">
      {toasts.map(({ id, info, screenTime }) => (
        <div
          key={id}
          className={clsx('toast', info.type)}
          style={varList({
            'exit-time': EXIT_TIME + 'ms',
            'screen-time': screenTime + 'ms',
          })}
        >
          <Icon iconClass={iconClassMatching[info.type]} />
          <p className="text">{info.text}</p>
        </div>
      ))}
    </div>
  )
}

export default Snackbar
