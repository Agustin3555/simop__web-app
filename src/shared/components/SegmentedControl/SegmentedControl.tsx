import './SegmentedControl.css'
import { InputHTMLAttributes, useEffect, useState, useRef } from 'react'
import { Icon } from '@/components'
import { clsx, varList } from '@/helpers'

export interface Option {
  text?: string
  iconClass?: string
  inputHtmlAttrs: InputHTMLAttributes<HTMLInputElement>
}

export interface SegmentedControlProps {
  name: string
  options: Option[]
  size?: 's' | 'm'
}

export const SegmentedControl = ({
  name,
  options,
  size = 'm',
}: SegmentedControlProps) => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isInitializing, setIsInitializing] = useState(true)
  const inputsRef = useRef<HTMLInputElement[]>([])

  useEffect(() => {
    const checkedIndex = inputsRef.current.findIndex(input => input.checked)
    if (checkedIndex !== -1) setActiveIndex(checkedIndex)

    setTimeout(() => setIsInitializing(false), 0)

    inputsRef.current.forEach((input, i) => {
      const handleChange = () => setActiveIndex(i)
      input.addEventListener('change', handleChange)
      return () => input.removeEventListener('change', handleChange)
    })
  }, [])

  return (
    <fieldset
      className={clsx('cmp-segmented-control', `ui-${size}`, {
        'is-initializing': isInitializing,
      })}
      style={varList({
        'options-length': options.length,
        'active-index': activeIndex,
      })}
    >
      <div className="indicator-container" />
      {options.map(({ text, iconClass, inputHtmlAttrs }, i) => (
        <label key={i} className={clsx({ square: text === undefined })}>
          {text}
          <input
            ref={el => {
              if (el) inputsRef.current[i] = el
            }}
            type="radio"
            hidden
            {...{ name }}
            {...inputHtmlAttrs}
          />
          {iconClass && <Icon {...{ iconClass }} />}
        </label>
      ))}
    </fieldset>
  )
}
