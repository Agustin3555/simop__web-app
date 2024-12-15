import './Input.css'
import { InputHTMLAttributes } from 'react'
import { useLabel } from '@/hooks'
import { Control } from '@/types'
import { classList } from '@/helpers'

interface Props extends InputHTMLAttributes<HTMLInputElement>, Control {
  hideLabel?: boolean
}

const Input = ({
  name,
  title,
  hideLabel = false,
  required,
  long = 'm',
  ...rest
}: Props) => {
  const { content, controlTitle } = useLabel({ title, required })

  return (
    <div className={classList('cmp-input', 'control', long)}>
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
