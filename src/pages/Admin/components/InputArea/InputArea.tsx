import './InputArea.css'
import { TextareaHTMLAttributes } from 'react'
import { useInputField } from '@/hooks'
import { classList } from '@/helpers'
import { InputFieldPartial } from '@/types'

interface InputAreaProps extends InputFieldPartial {
  value?: string
  textareaHTMLAttrs?: TextareaHTMLAttributes<HTMLTextAreaElement>
}

const InputArea = ({
  keyName,
  title,
  value,
  isRequired = false,
  isEditMode = false,
  textareaHTMLAttrs,
}: InputAreaProps) => {
  const { inputTitle, disabledState } = useInputField({ title, isRequired })
  const { disabled } = disabledState

  return (
    <div className={classList('cmp-input-area', 'control')}>
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
