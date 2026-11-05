import './SegmentedControl.css'
import { Dispatch, SetStateAction } from 'react'
import { useInputHandler } from '../../hooks/useInputHandler.hook'
import { clsx } from '@/helpers'
import { Icon } from '@/components'

export interface SegmentedControlProps<T> {
  name: string
  selected: T
  setSelected: Dispatch<SetStateAction<T>>
  options: {
    value: T
    title?: string
    text?: string
    iconClass: string
  }[]
  size?: 's' | 'm'
}

const SegmentedControl = <T extends string>({
  name,
  selected,
  setSelected,
  options,
  size = 'm',
}: SegmentedControlProps<T>) => {
  const handleChange = useInputHandler(value => setSelected(value as T))

  return (
    <fieldset className={clsx('cmp-segmented-control', `ui-${size}`)}>
      {options.map(({ value, title, text, iconClass }) => (
        <label
          key={value}
          className={clsx({ square: text === undefined })}
          {...{ title }}
        >
          {text}
          <input
            type="radio"
            checked={selected === value}
            onChange={handleChange}
            {...{ name, value }}
          />
          <Icon {...{ iconClass }} />
        </label>
      ))}
    </fieldset>
  )
}

export default SegmentedControl
