import './InputArea.css'
import { TextareaHTMLAttributes } from 'react'
import { useControl, useResetByRender } from '@/hooks'
import { classList } from '@/helpers'
import { Control } from '@/types'
import { ControlLabel } from '@/components'

interface InputAreaProps extends Control {
  value?: string
  textareaHTMLAttrs?: TextareaHTMLAttributes<HTMLTextAreaElement>
}

const InputArea = ({
  keyName,
  title,
  value,
  hideLabel = false,
  required = false,
  editMode = false,
  long = 'l',
  textareaHTMLAttrs,
}: InputAreaProps) => {
  const { inputTitle, disabledState } = useControl({ title, required })
  const { disabled } = disabledState

  const { renderKey, resetHandleClick } = useResetByRender()

  return (
    <div className={classList('cmp-text-area', 'control', long)}>
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
      <textarea
        key={renderKey}
        className="input box text"
        title={inputTitle}
        name={keyName}
        defaultValue={value}
        {...(editMode && { disabled })}
        {...{ required, ...textareaHTMLAttrs }}
      />
    </div>
  )
}

export default InputArea
