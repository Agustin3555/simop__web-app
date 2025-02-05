import './InputArea.css'
import { TextareaHTMLAttributes } from 'react'
import { useLabel } from '@/hooks'
import { classList } from '@/helpers'
import { Control } from '@/types'

interface Props extends TextareaHTMLAttributes<HTMLTextAreaElement>, Control {
  hideLabel?: boolean
}

const InputArea = ({
  name,
  title,
  hideLabel = false,
  required,
  long = 'l',
  ...rest
}: Props) => {
  const { content, controlTitle } = useLabel({ title, required })

  return (
    <div className={classList('cmp-text-area', 'control', long)}>
      {!hideLabel && <label className="label">{content}</label>}
      <textarea
        className="text box input"
        title={controlTitle}
        {...{ name, required }}
        {...rest}
      />
    </div>
  )
}

export default InputArea
