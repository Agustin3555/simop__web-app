import './OptionGroup.css'
import { InputHTMLAttributes } from 'react'
import { Checker } from '../Checker/Checker'
import { classList } from '@/helpers'

export interface Option {
  label: string
  inputHtmlAttrs: InputHTMLAttributes<HTMLInputElement>
}

interface OptionGroupProps {
  inputType?: 'checkbox' | 'radio'
  options: Option[]
  size?: 's' | 'm'
}

export const OptionGroup = ({
  inputType = 'checkbox',
  options,
  size = 'm',
}: OptionGroupProps) => {
  return (
    <div className={classList('cmp-option-group', `ui-${size}`)}>
      {options.map(({ label, inputHtmlAttrs }, i) => (
        <label key={i}>
          {/* TODO: testear si hidden no interfiere en los forms */}
          <input type={inputType} hidden {...inputHtmlAttrs} />
          {size !== 's' && <Checker />}
          {label}
        </label>
      ))}
    </div>
  )
}
