import './Checkbox.css'
import { InputHTMLAttributes, useState } from 'react'
import { useLabel } from '@/hooks'
import { Icon } from '@/components'
import { Control } from '@/types'
import { classList } from '@/helpers'

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement>, Control {
  falseText?: string
  trueText?: string
}

const Checkbox = ({
  name,
  title,
  hideLabel = false,
  long = 's',
  falseText = 'No',
  trueText = 'Si',
  ...rest
}: CheckboxProps) => {
  const { labelContent, inputTitle } = useLabel({ title })
  const [firstChange, setFirstChange] = useState(false)

  const handleChange = () => setFirstChange(true)

  return (
    <div className={classList('cmp-checkbox', 'control', long)}>
      {!hideLabel && (
        <label htmlFor={name} className="label">
          {labelContent}
        </label>
      )}
      <div className="box">
        <input
          title={inputTitle}
          type="checkbox"
          {...{ name }}
          onChange={handleChange}
          data-use-value={firstChange}
          {...rest}
        />
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
