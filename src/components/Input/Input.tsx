import './Input.css'
import { InputHTMLAttributes } from 'react'
import { useLabel } from '@/hooks'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  hideLabel?: boolean
}

const Input = ({
  name,
  title,
  hideLabel = false,
  required,
  ...rest
}: Props) => {
  const { content, controlTitle } = useLabel({ title, required })

  return (
    <div className="cmp-input control">
      {!hideLabel && <label className="label">{content}</label>}
      <input
        className="input box"
        title={controlTitle}
        {...{ name, required }}
        {...rest}
      />
    </div>
  )
}

export default Input
