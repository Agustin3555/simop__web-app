import './InputArea.css'
import { TextareaHTMLAttributes } from 'react'
import { useControl } from '@/hooks'
import { classList } from '@/helpers'
import { Control } from '@/types'
import { ControlLabel } from '@/components'

interface InputAreaProps extends Control {
  textareaHTMLAttrs?: TextareaHTMLAttributes<HTMLTextAreaElement>
}

const InputArea = ({
  keyName,
  title,
  hideLabel = false,
  required = false,
  editMode = false,
  long = 'l',
  textareaHTMLAttrs,
}: InputAreaProps) => {
  const { inputTitle, disabledState } = useControl({ title, required })
  const { disabled } = disabledState

  return (
    <div className={classList('cmp-text-area', 'control', long)}>
      <ControlLabel
        {...{ title, hideLabel, required, editMode, ...disabledState }}
      />
      <textarea
        className="input box text"
        title={inputTitle}
        name={keyName}
        {...(editMode && { disabled })}
        {...{ required, ...textareaHTMLAttrs }}
      />
    </div>
  )
}

export default InputArea
