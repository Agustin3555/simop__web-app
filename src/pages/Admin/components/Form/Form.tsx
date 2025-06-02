import './Form.css'
import {
  KeyboardEventHandler,
  MutableRefObject,
  ReactNode,
  useCallback,
} from 'react'
import { useSubmitAction } from '@/hooks'
import { Button } from '@/components'

interface FormProps extends ReturnType<typeof useSubmitAction> {
  formRef?: MutableRefObject<HTMLFormElement | null>
  fieldGroups?: {
    key: string
    title?: string
    fields: ReactNode[]
  }[]
}

const Form = ({
  actionState,
  handleSubmit,
  formRef,
  fieldGroups,
}: FormProps) => {
  const handleKeyDown = useCallback<KeyboardEventHandler<HTMLFormElement>>(
    event => event.key === 'Enter' && event.preventDefault(),
    [],
  )

  return (
    <form
      className="cmp-form"
      ref={formRef}
      onSubmit={handleSubmit}
      onKeyDown={handleKeyDown}
    >
      <div className="field-groups">
        {fieldGroups?.map(({ key, title, fields }) => (
          <div key={key} className="section">
            {title && <small>{title}</small>}
            <div className="fields">{fields}</div>
          </div>
        ))}
      </div>
      <Button
        text="Confirmar"
        faIcon="fa-solid fa-check"
        submit
        {...{ actionState }}
      />
    </form>
  )
}

export default Form
