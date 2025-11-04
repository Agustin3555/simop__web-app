import './Input.css'
import { InputHTMLAttributes } from 'react'
import { useInputField, useResetByRender } from '@/hooks'
import { InputFieldPartial } from '@/types'
import { classList } from '@/helpers'
import { InputLabel } from '..'

export interface InputProps extends InputFieldPartial {
  value?: number | string
  inputHTMLAttrs?: InputHTMLAttributes<HTMLInputElement>
}

const Input = ({
  keyName,
  title,
  value: defaultValue,
  hideLabel = false,
  isRequired = false,
  isEditMode = false,
  inputHTMLAttrs,
}: InputProps) => {
  const { inputTitle, disabledState } = useInputField({ title, isRequired })
  const { disabled } = disabledState

  const { renderKey, resetHandleClick } = useResetByRender(keyName)

  return (
    <div className={classList('cmp-input', 'control')}>
      <InputLabel
        {...{
          title,
          hideLabel,
          isRequired,
          isEditMode,
          ...disabledState,
          resetHandleClick,
        }}
      />
      <input
        key={renderKey}
        className="input box"
        title={inputTitle}
        name={keyName}
        autoComplete="off"
        {...(isEditMode && { disabled })}
        {...{ defaultValue, ...inputHTMLAttrs }}
      />
    </div>
  )
}

export default Input
