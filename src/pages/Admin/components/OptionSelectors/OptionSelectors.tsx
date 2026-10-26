import './OptionSelectors.css'
import { Dispatch, SetStateAction } from 'react'
import { useInputHandler } from '../../hooks/useInputHandler.hook'

interface OptionSelectorsProps {
  name: string
  selected: string
  setSelected: Dispatch<SetStateAction<string>>
  // TODO: pasar siempre un título corto
  options: { value: string; title: string }[]
}

const OptionSelectors = ({
  name,
  selected,
  setSelected,
  options,
}: OptionSelectorsProps) => {
  const handleChange = useInputHandler(value => setSelected(value))

  return (
    <fieldset className="cmp-option-selectors">
      {options.map(({ value, title }) => (
        <label key={value}>
          {title}
          <input
            type="radio"
            checked={selected === value}
            onChange={handleChange}
            {...{ name, value }}
          />
        </label>
      ))}
    </fieldset>
  )
}

export default OptionSelectors
