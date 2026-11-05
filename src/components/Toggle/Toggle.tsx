import './Toggle.css'
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  useCallback,
  useMemo,
} from 'react'
import { Icon } from '@/components'
import { clsx } from '@/helpers'

type Style = 'toggle' | 'switch'

export interface ToggleProps {
  handlingClass?: string
  title: string
  iconClass?: string
  size?: 's' | 'm' | 'l'
  style?: Style
  value: boolean
  setValue?: Dispatch<SetStateAction<boolean>>
  onChange?: () => void
}

const Toggle = ({
  handlingClass,
  title,
  iconClass = 'fa-solid fa-check',
  size = 's',
  style = 'toggle',
  value: checked,
  setValue,
  onChange,
}: ToggleProps) => {
  const ui = useMemo(() => {
    const components: Record<Style, ReactNode> = {
      toggle: (
        <div className="toggle">
          <Icon {...{ iconClass }} />
        </div>
      ),
      switch: (
        <div className="switch">
          <div className="lever">
            <Icon {...{ iconClass }} />
          </div>
        </div>
      ),
    }

    return components[style]
  }, [])

  const handleChange = useCallback(() => {
    setValue && setValue(prevValue => !prevValue)
    onChange && onChange()
  }, [onChange, setValue])

  return (
    <label
      className={clsx('cmp-toggle', `ui-${size}`, handlingClass)}
      {...{ title }}
    >
      <input type="checkbox" onChange={handleChange} {...{ checked }} />
      {ui}
    </label>
  )
}

export default Toggle
