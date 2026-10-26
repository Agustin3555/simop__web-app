import './Form.css'
import { ReactNode, useEffect, useId, useState } from 'react'
import { useSubmitAction } from '@/hooks'
import { Button, Toggle } from '@/components'
import SegmentedControl, {
  SegmentedControlProps,
} from '../SegmentedControl/SegmentedControl'
import { classList } from '@/helpers'
import { TableKey } from '../../constants/metaModelKey.const'

type LayoutMode = 'masonry' | 'rows'

const LAYOUT_MODES_OPTIONS: SegmentedControlProps<LayoutMode>['options'] = [
  {
    value: 'masonry',
    title: 'Por columnas',
    faIcon: 'fa-solid fa-chart-simple fa-rotate-180',
  },
  {
    value: 'rows',
    title: 'Por filas',
    faIcon: 'fa-solid fa-pause fa-rotate-90',
  },
]

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
  const [layoutMode, setLayoutMode] = useState<LayoutMode>('masonry')

  const id = useId()

  useEffect(() => {
    if (enableReset && resetOnSuccess && actionState === 'success') {
      setResetKey(prev => prev + 1)
    }
  }, [actionState, enableReset, resetOnSuccess])

  return (
    <div className="cmp-form">
      <header>
        <SegmentedControl
          name={`layoutMode-${tableKey}-${id}`}
          selected={layoutMode}
          setSelected={setLayoutMode}
          options={LAYOUT_MODES_OPTIONS}
          size="s"
        />
        {enableReset && (
          <Toggle
            title="Limpiar después de crear"
            faIcon="fa-solid fa-eraser"
            value={resetOnSuccess}
            setValue={setResetOnSuccess}
          />
        )}
      </header>
      <form className="form-style" onSubmit={handleSubmit}>
        <div key={resetKey} className={classList('field-groups', layoutMode)}>
          {fieldGroups?.map(({ title, fields }, i) => (
            <div key={i} className="section">
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
    </div>
  )
}

export default Form
