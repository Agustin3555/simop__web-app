import './InputArea.css'
import { TextareaHTMLAttributes } from 'react'
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
  return (
    <div className={classList('cmp-input-area', 'control')}>
      <textarea
        className="input box text"
        name={keyName}
        defaultValue={value}
        {...textareaHTMLAttrs}
      />
    </div>
  )
}

export default InputArea
