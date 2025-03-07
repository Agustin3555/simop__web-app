import './Toggle.css'
import { Icon } from '@/components'
import { classList } from '@/helpers'
import { Dispatch, SetStateAction, useCallback } from 'react'

export interface ToggleProps {
  title: string
  faIcon: string
  value: boolean
  setValue: Dispatch<SetStateAction<boolean>>
  size?: 'xs'
}

const Toggle = ({
  title,
  faIcon,
  value: checked,
  setValue,
  size,
}: ToggleProps) => {
  const handleChange = useCallback(() => setValue(prevValue => !prevValue), [])

  return (
    <label className={classList('cmp-toggle', size)}>
      <input type="checkbox" onChange={handleChange} {...{ title, checked }} />
      <div className="toggle">
        <div className="lever">
          <Icon {...{ faIcon }} />
        </div>
      </div>
    </label>
  )
}

export default Toggle
