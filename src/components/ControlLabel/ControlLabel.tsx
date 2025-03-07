import './ControlLabel.css'
import { useMemo } from 'react'
import { Control } from '@/types'
import { Button, Toggle } from '..'
import { ToggleProps } from '../Toggle/Toggle'

interface ControlLabelProps
  extends Pick<Control, 'title'>,
    Required<Pick<Control, 'hideLabel' | 'required' | 'editMode'>> {
  discreetLabel?: boolean
  disabled: ToggleProps['value']
  setDisabled: ToggleProps['setValue']
}

const ControlLabel = ({
  title,
  hideLabel,
  required,
  editMode,
  discreetLabel = false,
  disabled,
  setDisabled,
}: ControlLabelProps) => {
  const labelContent = useMemo(
    () => (
      <>
        {title}
        {required && <span>*</span>}
      </>
    ),
    [required, title],
  )

  return (
    (editMode || !hideLabel) && (
      <div className="cmp-control-label">
        {discreetLabel ? (
          <small className="title">{labelContent}</small>
        ) : (
          <label className="title">{labelContent}</label>
        )}
        {editMode && (
          <div className="editing-actions">
            <Button
              title="Reiniciar valor"
              faIcon="fa-solid fa-arrow-rotate-left"
              hideText
              size="xs"
              _type="secondary"
            />
            <Toggle
              title="Alternar edición"
              faIcon="fa-solid fa-pen"
              value={!disabled}
              setValue={setDisabled}
              size="xs"
            />
          </div>
        )}
      </div>
    )
  )
}

export default ControlLabel
