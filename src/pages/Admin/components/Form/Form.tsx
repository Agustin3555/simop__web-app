import './Form.css'
import { ReactNode, useEffect, useState } from 'react'
import { Section } from '@/shared/components/Section/Section'
import { useSubmitAction } from '@/hooks'
import { Toggle } from '@/components'
import { TableKey } from '../../constants/metaModelKey.const'
import { Button } from '@/shared/components/Button/Button'

interface FormProps extends ReturnType<typeof useSubmitAction> {
  tableKey: TableKey
  fieldGroups?: {
    title?: string
    fields: ReactNode[]
  }[]
  enableReset?: boolean
}

const Form = ({
  tableKey,
  actionState,
  handleSubmit,
  fieldGroups,
  enableReset = false,
}: FormProps) => {
  const [resetOnSuccess, setResetOnSuccess] = useState(true)
  const [resetKey, setResetKey] = useState(0)

  useEffect(() => {
    if (enableReset && resetOnSuccess && actionState === 'success') {
      setResetKey(prev => prev + 1)
    }
  }, [actionState, enableReset, resetOnSuccess])

  return (
    <div className="cmp-form">
      <header>
        {enableReset && (
          <Toggle
            title="Limpiar después de crear"
            iconClass="fa-solid fa-eraser"
            value={resetOnSuccess}
            setValue={setResetOnSuccess}
          />
        )}
      </header>
      <form onSubmit={handleSubmit}>
        <div key={resetKey} className="field-groups">
          {fieldGroups?.map(({ title, fields }, i) => (
            <Section key={i} label={title}>
              <div className="fields">{fields}</div>
            </Section>
          ))}
        </div>
        <footer>
          <Button
            text="Confirmar"
            iconClass="fa-solid fa-check"
            submit
            {...{ actionState }}
          />
        </footer>
      </form>
    </div>
  )
}

export default Form
