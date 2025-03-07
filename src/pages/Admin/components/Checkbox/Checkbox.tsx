import './Checkbox.css'
import { useState } from 'react'
import { useControl } from '@/hooks'
import { ControlLabel, Icon } from '@/components'
import { Control } from '@/types'
import { classList } from '@/helpers'

interface CheckboxProps extends Control {
  falseText?: string
  trueText?: string
}

const Checkbox = ({
  keyName,
  title,
  hideLabel = false,
  required = false,
  editMode = false,
  long = 's',
  falseText = 'No',
  trueText = 'Si',
}: CheckboxProps) => {
  const { inputTitle, disabledState } = useControl({ title, required })
  const { disabled } = disabledState

  const [firstChange, setFirstChange] = useState(false)

  const handleChange = () => setFirstChange(true)

  return (
    <div className={classList('cmp-checkbox', 'control', long)}>
      <ControlLabel
        {...{ title, hideLabel, required, editMode, ...disabledState }}
      />
      <div className="box">
        <input
          title={inputTitle}
          name={keyName}
          type="checkbox"
          data-use-value={firstChange}
          onChange={handleChange}
          {...(editMode && { disabled })}
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
