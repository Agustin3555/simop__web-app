import './Toolbar.css'
import { Dispatch, SetStateAction, useCallback } from 'react'
import { Button, Toggle } from '@/components'
import { ToggleProps } from '@/components/Toggle/Toggle'
import { Combobox, Value } from '../../..'
import { useMetaModel, useTable } from '@/pages/Admin/hooks'
import { ButtonProps } from '@/components/Button/Button'
import { ComboboxProps } from '../../../Combobox/Combobox'

export type ToggleKey =
  | 'filters'
  | 'columnControl'
  | 'simplifyMatches'
  | 'stickHead'
  | 'stickFoot'

const toggles: Record<
  ToggleKey,
  Required<Pick<ToggleProps, 'title' | 'faIcon'>>
> = {
  filters: {
    title: 'Filtrar',
    faIcon: 'fa-solid fa-filter',
  },
  simplifyMatches: {
    title: 'Simplificar coincidencias',
    faIcon: 'fa-solid fa-down-left-and-up-right-to-center fa-rotate-by',
  },
  columnControl: {
    title: 'Controlar columnas',
    faIcon: 'fa-solid fa-table-columns',
  },
  stickHead: {
    title: 'Fijar cabecera de tabla',
    faIcon: 'fa-regular fa-window-maximize',
  },
  stickFoot: {
    title: 'Fijar pie de tabla',
    faIcon: 'fa-regular fa-window-maximize fa-rotate-180',
  },
}

export type ToggleStates = Record<ToggleKey, boolean>

export interface ToolbarProps {
  toggleStates: ToggleStates
  setToggleStates: Dispatch<SetStateAction<ToggleStates>>
  comboboxProps: Pick<ComboboxProps, 'selected' | 'setSelected' | 'options'>
  onExportClick: ButtonProps['onAction']
}

const Toolbar = ({
  toggleStates,
  setToggleStates,
  onExportClick,
  comboboxProps,
}: ToolbarProps) => {
  const { key } = useMetaModel()
  const { table } = useTable()

  const dataLength = table!.options.data.length
  const filteredDataLength = table!.getFilteredRowModel().rows.length

  const handleChange = useCallback(
    (key: ToggleKey) => () =>
      setToggleStates(prev => ({ ...prev, [key]: !toggleStates[key] })),
    [toggleStates],
  )

  return (
    <div className="cmp-toolbar">
      <div className="main-bar">
        <div className="left">
          {Object.entries(toggles).map(([keyStr, props]) => {
            const key = keyStr as ToggleKey

            return (
              <Toggle
                key={key}
                {...props}
                value={toggleStates[key]}
                onChange={handleChange(key)}
              />
            )
          })}
        </div>
        <div className="center">
          {filteredDataLength !== dataLength && (
            <Value
              text={filteredDataLength}
              faIcon="fa-solid fa-filter"
              size="s"
              type="secondary"
              pill
            />
          )}
          <Value
            text={dataLength}
            faIcon="fa-solid fa-cubes-stacked"
            size="s"
            type="secondary"
            pill
          />
        </div>
        <div className="right">
          <Button
            text="Excel"
            title="Descargar Excel"
            faIcon="fa-solid fa-file-arrow-down"
            size="s"
            type="secondary"
            onAction={onExportClick}
          />
        </div>
      </div>
      {toggleStates['columnControl'] && (
        <Combobox
          keyName={`visibility-${key}`}
          title="Columnas activas"
          hideLabel
          isMultiple
          {...comboboxProps}
        />
      )}
    </div>
  )
}

export default Toolbar
