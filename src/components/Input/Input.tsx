import './Input.css'
import { InputHTMLAttributes } from 'react'
import { useControl } from '@/hooks'
import { Control } from '@/types'
import { classList } from '@/helpers'
import { ControlLabel } from '..'

export interface InputProps extends Control {
  inputHTMLAttrs?: InputHTMLAttributes<HTMLInputElement>
}

const Input = ({
  keyName,
  title,
  hideLabel = false,
  required = false,
  editMode = false,
  long = 'm',
  inputHTMLAttrs,
}: InputProps) => {
  const { inputTitle, disabledState } = useControl({ title, required })
  const { disabled } = disabledState

  return (
    <div className={classList('cmp-input', 'control', long)}>
      <ControlLabel
        {...{ title, hideLabel, required, editMode, ...disabledState }}
      />
      <input
        className="input box"
        title={inputTitle}
        name={keyName}
        {...(editMode && { disabled })}
        {...{ required, ...inputHTMLAttrs }}
      />
    </div>
  )
}

export default Input
