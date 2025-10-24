import './Form.css'
import { ReactNode, RefObject } from 'react'
import { useSubmitAction } from '@/hooks'
import { Button } from '@/components'

interface FormProps extends ReturnType<typeof useSubmitAction> {
  formRef?: RefObject<HTMLFormElement | null>
  fieldGroups?: {
    key?: string
    title?: string
    fields: ReactNode[]
  }[]
}

const Form = ({
  actionState,
  handleSubmit,
  formRef,
  fieldGroups,
}: FormProps) => (
  <form className="cmp-form" ref={formRef} onSubmit={handleSubmit}>
    <div className="field-groups">
      {fieldGroups?.map(({ key, title, fields }, i) => (
        <div key={key ?? i} className="section">
          {title && <small>{title}</small>}
          <div className="fields">{fields}</div>
        </div>
      ))}
    </div>
    <footer>
      <Button
        text="Confirmar"
        faIcon="fa-solid fa-check"
        submit
        {...{ actionState }}
      />
    </footer>
  </form>
)

export default Form
