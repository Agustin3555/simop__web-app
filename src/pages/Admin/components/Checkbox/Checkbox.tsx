import './Checkbox.css'
import { useInputField, useResetByRender } from '@/hooks'
import { InputLabel, Icon } from '@/components'
import { InputFieldPartial } from '@/types'
import { classList } from '@/helpers'

interface CheckboxProps extends InputFieldPartial {
  value?: boolean
  falseText?: string
  trueText?: string
}

const Checkbox = ({
  keyName,
  title,
  value: defaultChecked,
  hideLabel = false,
  isRequired = false,
  isEditMode = false,
  falseText = 'No',
  trueText = 'Si',
}: CheckboxProps) => {
  const { inputTitle, disabledState } = useInputField({ title, isRequired })
  const { disabled } = disabledState

  const { renderKey, resetHandleClick } = useResetByRender(keyName)

  return (
    <div className={classList('cmp-checkbox', 'control')}>
      <InputLabel
        {...{
          title,
          hideLabel,
          isRequired,
          isEditMode,
          ...disabledState,
          resetHandleClick,
        }}
      />
      <div className={classList('box', { ...(isEditMode && { disabled }) })}>
        <input
          key={renderKey}
          title={inputTitle}
          name={keyName}
          type="checkbox"
          {...(isEditMode && { disabled })}
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
