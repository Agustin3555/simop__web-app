import './Input.css'
import { InputHTMLAttributes } from 'react'
import { InputFieldPartial } from '@/types'
import { clsx } from '@/helpers'

export interface InputProps extends InputFieldPartial {
  value?: number | string
  inputHTMLAttrs?: InputHTMLAttributes<HTMLInputElement>
}

const Input = ({
  keyName,
  title,
  value: defaultValue,
  isRequired = false,
  isEditMode = false,
  inputHTMLAttrs,
}: InputProps) => {
  return (
    <div className={clsx('cmp-input', 'control')}>
      <input
        className="input box"
        name={keyName}
        autoComplete="off"
        required={isRequired}
        {...{ defaultValue, ...inputHTMLAttrs }}
      />
    </div>
  )
}

export default Input
