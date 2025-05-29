import './Toggle.css'
import { Icon } from '@/components'
import { classList } from '@/helpers'
import { Dispatch, SetStateAction, useCallback } from 'react'

export interface ToggleProps {
  title: string
  faIcon: string
  size?: 's' | 'm'
  asSwitch?: boolean
  value: boolean
  setValue?: Dispatch<SetStateAction<boolean>>
}

const Toggle = ({
  title,
  faIcon,
  size = 's',
  asSwitch = false,
  value: checked,
  setValue,
}: ToggleProps) => {
  const handleChange = useCallback(() => {
    setValue && setValue(prevValue => !prevValue)
  }, [])

  return (
    <label
      className={classList('cmp-toggle', size, { switch: asSwitch })}
      {...{ title }}
    >
      <input type="checkbox" onChange={handleChange} {...{ checked }} />
      {asSwitch ? (
        <div className="switch">
          <div className="lever">
            <Icon {...{ faIcon }} />
          </div>
        </div>
      ) : (
        <div className="toggle">
          <Icon {...{ faIcon }} />
        </div>
      )}
    </label>
  )
}

export default Toggle
