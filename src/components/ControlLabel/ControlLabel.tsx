import './ControlLabel.css'
import { useMemo } from 'react'
import { Control } from '@/types'
import { Button2, Toggle } from '..'
import { ToggleProps } from '../Toggle/Toggle'

export interface ControlLabelProps
  extends Pick<Control, 'title'>,
    Required<Pick<Control, 'hideLabel' | 'required' | 'editMode'>> {
  discreetLabel?: boolean
  disabled: ToggleProps['value']
  setDisabled: ToggleProps['setValue']
  resetHandleClick?: () => void
}

const ControlLabel = ({
  title,
  hideLabel,
  required,
  editMode,
  discreetLabel = false,
  disabled,
  setDisabled,
  resetHandleClick,
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
            {resetHandleClick && (
              <Button2
                title="Reiniciar valor"
                faIcon="fa-solid fa-arrow-rotate-left"
                size="s"
                type="secondary"
                onAction={resetHandleClick}
              />
            )}
            <Toggle
              title="Alternar edición"
              faIcon="fa-solid fa-pen"
              value={!disabled}
              setValue={setDisabled}
            />
          </div>
        )}
      </div>
    )
  )
}

export default ControlLabel
