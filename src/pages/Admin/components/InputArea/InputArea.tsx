import './InputArea.css'
import { TextareaHTMLAttributes } from 'react'
import { useInputField } from '@/hooks'
import { classList } from '@/helpers'
import { InputFieldPartial } from '@/types'
import { InputLabel } from '@/components'

interface InputAreaProps extends InputFieldPartial {
  value?: string
  textareaHTMLAttrs?: TextareaHTMLAttributes<HTMLTextAreaElement>
}

const InputArea = ({
  keyName,
  title,
  value,
  hideLabel = false,
  isRequired = false,
  isEditMode = false,
  textareaHTMLAttrs,
}: InputAreaProps) => {
  const { inputTitle, disabledState } = useInputField({ title, isRequired })
  const { disabled } = disabledState

  return (
    <div className={classList('cmp-input-area', 'control')}>
      <InputLabel
        {...{
          title,
          hideLabel,
          isRequired,
          isEditMode,
          ...disabledState,
        }}
      />
      <textarea
        className="input box text"
        title={inputTitle}
        name={keyName}
        defaultValue={value}
        {...(isEditMode && { disabled })}
        {...textareaHTMLAttrs}
      />
    </div>
  )
}

export default InputArea
