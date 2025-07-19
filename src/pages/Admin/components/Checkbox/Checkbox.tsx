import './Checkbox.css'
import { useControl, useResetByRender } from '@/hooks'
import { ControlLabel, Icon } from '@/components'
import { Control } from '@/types'
import { classList } from '@/helpers'

interface CheckboxProps extends Control {
  value?: boolean
  falseText?: string
  trueText?: string
}

const Checkbox = ({
  keyName,
  title,
  value: defaultChecked,
  hideLabel = false,
  required = false,
  editMode = false,
  long = 's',
  falseText = 'No',
  trueText = 'Si',
}: CheckboxProps) => {
  const { inputTitle, disabledState } = useControl({ title, required })
  const { disabled } = disabledState

  const { renderKey, resetHandleClick } = useResetByRender(keyName)

  return (
    <div className={classList('cmp-checkbox', 'control', long)}>
      <ControlLabel
        {...{
          title,
          hideLabel,
          required,
          editMode,
          ...disabledState,
          resetHandleClick,
        }}
      />
      <div className={classList('box', { ...(editMode && { disabled }) })}>
        <input
          key={renderKey}
          title={inputTitle}
          name={keyName}
          type="checkbox"
          {...(editMode && { disabled })}
          {...{ defaultChecked }}
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
