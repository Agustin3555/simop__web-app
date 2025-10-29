import './SegmentedControl.css'
import { Dispatch, SetStateAction } from 'react'
import { useInputHandler } from '../../hooks'
import { classList } from '@/helpers'
import { Icon } from '@/components'

export interface SegmentedControlProps<T> {
  name: string
  selected: T
  setSelected: Dispatch<SetStateAction<T>>
  options: {
    value: T
    title?: string
    text?: string
    faIcon: string
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
    <fieldset className={classList('cmp-segmented-control', `ui-${size}`)}>
      {options.map(({ value, title, text, faIcon }) => (
        <label
          key={value}
          className={classList({ square: text === undefined })}
          {...{ title }}
        >
          {text}
          <input
            type="radio"
            checked={selected === value}
            onChange={handleChange}
            {...{ name, value }}
          />
          <Icon {...{ faIcon }} />
        </label>
      ))}
    </fieldset>
  )
}

export default SegmentedControl
