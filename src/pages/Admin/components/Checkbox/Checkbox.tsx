import './Checkbox.css'
import { InputHTMLAttributes, useEffect, useState } from 'react'
import { useLabel } from '@/hooks'
import { Icon } from '@/components'
import { Control } from '@/types'
import { classList } from '@/helpers'

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement>, Control {
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
  long = 's',
  ...rest
}: CheckboxProps) => {
  const { content, controlTitle } = useLabel({ title })
  const [firstChange, setFirstChange] = useState(false)

  const handleChange = () => setFirstChange(true)

  return (
    <div className={classList('cmp-checkbox', 'control', long)}>
      {!hideLabel && (
        <label htmlFor={name} className="label">
          {content}
        </label>
      )}
      <div className="box">
        <input
          title={controlTitle}
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
