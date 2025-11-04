import './InputLabel.css'
import { InputField } from '@/types'
import { Button, Toggle } from '..'
import { ToggleProps } from '../Toggle/Toggle'

type LabelContentProps = Pick<InputField, 'title' | 'isRequired'>

const LabelContent = ({ title, isRequired }: LabelContentProps) => (
  <>
    {title}
    {isRequired && <span>*</span>}
  </>
)

export interface InputLabelProps
  extends Pick<
    InputField,
    'title' | 'hideLabel' | 'isRequired' | 'isEditMode'
  > {
  discreetLabel?: boolean
  disabled: ToggleProps['value']
  setDisabled: ToggleProps['setValue']
  resetHandleClick?: () => void
}

const InputLabel = ({
  title,
  hideLabel,
  isRequired,
  isEditMode,
  discreetLabel = false,
  disabled,
  setDisabled,
  resetHandleClick,
}: InputLabelProps) => {
  if (!isEditMode && hideLabel) return

  return (
    <div className="cmp-input-label">
      {discreetLabel ? (
        <small className="title">
          <LabelContent {...{ title, isRequired }} />
        </small>
      ) : (
        <label className="title">
          <LabelContent {...{ title, isRequired }} />
        </label>
      )}
      {isEditMode && (
        <div className="editing-actions">
          {resetHandleClick && (
            <Button
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
}

export default InputLabel
