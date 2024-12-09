import './Checkbox.css'
import { InputHTMLAttributes } from 'react'
import { useLabel } from '@/hooks'
import { Icon } from '@/components'

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  hideLabel?: boolean
  falseText?: string
  trueText?: string
}

const Checkbox = ({
  name,
  title,
  falseText = 'No',
  trueText = 'Si',
  hideLabel = false,
  ...rest
}: CheckboxProps) => {
  const { content, controlTitle } = useLabel({ title })

  return (
    <div className="cmp-checkbox control">
      {!hideLabel && (
        <label htmlFor={name} className="label">
          {content}
        </label>
      )}
      <div className="box">
        <input title={controlTitle} type="checkbox" {...{ name }} {...rest} />
        <div className="check-container">
          <Icon faIcon="fa-solid fa-check" />
        </div>
        <small className="false">{falseText}</small>
        <small className="true">{trueText}</small>
      </div>
    </div>
  )
}

export default Checkbox
