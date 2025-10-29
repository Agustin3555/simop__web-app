import './Form.css'
import { ReactNode, RefObject, useState } from 'react'
import { useSubmitAction } from '@/hooks'
import { useMetaModel } from '../../hooks'
import { Button } from '@/components'
import SegmentedControl, {
  SegmentedControlProps,
} from '../SegmentedControl/SegmentedControl'
import { classList } from '@/helpers'

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
  formRef?: RefObject<HTMLFormElement | null>
  fieldGroups?: {
    key?: string
    title?: string
    fields: ReactNode[]
  }[]
  children?: ReactNode
}

const Form = ({
  actionState,
  handleSubmit,
  formRef,
  fieldGroups,
  children,
}: FormProps) => {
  const [layoutMode, setLayoutMode] = useState<LayoutMode>('masonry')

  const { key } = useMetaModel()

  return (
    <div className="cmp-form">
      <header>
        <SegmentedControl
          name={`layoutMode-${key}`}
          selected={layoutMode}
          setSelected={setLayoutMode}
          options={LAYOUT_MODES_OPTIONS}
          size="s"
        />
        {children}
      </header>
      <form ref={formRef} onSubmit={handleSubmit}>
        <div className={classList('field-groups', layoutMode)}>
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
    </div>
  )
}

export default Form
