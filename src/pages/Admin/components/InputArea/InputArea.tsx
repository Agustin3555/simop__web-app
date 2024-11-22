import './InputArea.css'
import { TextareaHTMLAttributes } from 'react'
import { useLabel } from '@/hooks'

interface Props extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  hideLabel?: boolean
}

const InputArea = ({
  name,
  title,
  hideLabel = false,
  required,
  ...rest
}: Props) => {
  const { content, controlTitle } = useLabel({ title, required })

  return (
    <div className="cmp-text-area control">
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
