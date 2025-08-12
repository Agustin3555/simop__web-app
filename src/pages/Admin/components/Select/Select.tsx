import './Select.css'
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'
import { useInputHandler } from '../../hooks'
import { classList } from '@/helpers'
import { Icon } from '@/components'

interface SelectProps {
  name: string
  title: string
  options: { value: string; title: string }[]
  size?: 'l' | 'm' | 's'
  selected: string
  setSelected: Dispatch<SetStateAction<string>>
}

const Select = ({
  name,
  title,
  options,
  size = 's',
  selected,
  setSelected,
}: SelectProps) => {
  const [open, setOpen] = useState(false)
  const componentRef = useRef<HTMLDivElement | null>(null)

  const selectedIndex = options.findIndex(o => o.value === selected)

  const handleHeaderClick = useCallback(() => setOpen(prev => !prev), [])

  const handleChange = useInputHandler(value => {
    setSelected(value)
    setOpen(false)
  })

  useEffect(() => {
    const component = componentRef.current

    const handleClick = (event: MouseEvent) => {
      // Cierra el componente si se produce un click fuera del propio elemento
      if (component && !component.contains(event.target as Node)) setOpen(false)
    }

    document.addEventListener('mousedown', handleClick)

    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  return (
    <div
      className={classList('cmp-select', `ui-${size}`, { open })}
      ref={componentRef}
    >
      <header onClick={handleHeaderClick} {...{ title }}>
        {options[selectedIndex].title}
        <div className="arrow">
          <Icon faIcon="fa-solid fa-angle-down" />
        </div>
      </header>
      <fieldset>
        {options.map(({ value, title }, i) => (
          <label key={value}>
            {title}
            <input
              type="radio"
              checked={i === selectedIndex}
              onChange={handleChange}
              {...{ name, value }}
            />
          </label>
        ))}
      </fieldset>
    </div>
  )
}

export default Select
