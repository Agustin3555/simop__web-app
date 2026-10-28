import './Checkbox.css'
import { useInputField } from '@/hooks'
import { Icon } from '@/components'
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
  isRequired = false,
  isEditMode = false,
  falseText = 'No',
  trueText = 'Si',
}: CheckboxProps) => {
  const { inputTitle, disabledState } = useInputField({ title, isRequired })
  const { disabled } = disabledState

  return (
    <div className={classList('cmp-checkbox', 'control')}>
      <div className={classList('box', { ...(isEditMode && { disabled }) })}>
        <input
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
