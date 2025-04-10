import './Input.css'
import { InputHTMLAttributes } from 'react'
import { useControl, useResetByRender } from '@/hooks'
import { Control } from '@/types'
import { classList } from '@/helpers'
import { ControlLabel } from '..'

export interface InputProps extends Control {
  value?: number | string
  inputHTMLAttrs?: InputHTMLAttributes<HTMLInputElement>
}

const Input = ({
  keyName,
  title,
  value: defaultValue,
  hideLabel = false,
  required = false,
  editMode = false,
  long = 'm',
  inputHTMLAttrs,
}: InputProps) => {
  const { inputTitle, disabledState } = useControl({ title, required })
  const { disabled } = disabledState

  const { renderKey, resetHandleClick } = useResetByRender()

  return (
    <div className={classList('cmp-input', 'control', long)}>
      <ControlLabel
        {...{
          title,
          hideLabel,
          required,
          editMode,
          ...disabledState,
          resetHandleClick,
        }}
      />
      <input
        key={renderKey}
        className="input box"
        title={inputTitle}
        name={keyName}
        {...(editMode && { disabled })}
        {...{ defaultValue, required, ...inputHTMLAttrs }}
        autoComplete="off"
      />
    </div>
  )
}

export default Input
