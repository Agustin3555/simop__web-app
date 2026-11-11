import './Toolbar.css'
import { useTable } from '../../contexts/Table/useTable.hook'
import { Dispatch, SetStateAction } from 'react'
import { Icon, Toggle } from '@/components'
import { ToggleProps } from '@/components/Toggle/Toggle'
import { ReportModal } from './components'
import { ColumnBehavior } from '@/shared/core/types'
import { CalcResults } from '../../hooks/useTableModel.hook'
import { Dropdown } from '@/shared/components/Dropdown/Dropdown'
import { Button } from '@/shared/components/Button/Button'
import {
  Option,
  OptionGroup,
} from '@/shared/components/OptionGroup/OptionGroup'
import { Field } from '@/shared/components/Field/Field'

export type ToggleKey = 'columnControl' | 'stickHeader' | 'stickFooter'
export type TogglesState = Record<ToggleKey, boolean>

const TOGGLES_INFO: Record<
  ToggleKey,
  Required<Pick<ToggleProps, 'title' | 'iconClass'>>
> = {
  columnControl: {
    title: 'Controlar columnas',
    iconClass: 'fa-solid fa-table-columns',
  },
  stickHeader: {
    title: 'Fijar cabecera de tabla',
    iconClass: 'fa-regular fa-window-maximize',
  },
  stickFooter: {
    title: 'Fijar pie de tabla',
    iconClass: 'fa-regular fa-window-maximize fa-rotate-180',
  },
}

export interface ToolbarProps {
  renderedColumns: ColumnBehavior[]
  renderedRows: { key: string; row: Record<string, unknown> }[]
  selectedRows: { key: string; row: Record<string, unknown> }[]
  renderedCalcResults: CalcResults
  selectedCalcResults: CalcResults
  dataLength: number
  editModeState?: [boolean, Dispatch<SetStateAction<boolean>>]
  togglesState: [TogglesState, Dispatch<SetStateAction<TogglesState>>]
}

export const Toolbar = ({
  renderedColumns,
  renderedRows,
  selectedRows,
  renderedCalcResults,
  selectedCalcResults,
  dataLength,
  editModeState,
  togglesState: [toggles, setToggles],
}: ToolbarProps) => {
  const columnFilters = useTable(s => s.columnFilters)
  const cleanFilters = useTable(s => s.cleanFilters)

  const handleToggleChange = (key: ToggleKey) => () => {
    setToggles(prev => ({ ...prev, [key]: !toggles[key] }))
  }

  const options: Option[] = [
    {
      label: `En vista (${renderedRows.length})`,
      inputHtmlAttrs: {
        // checked: valueState === undefined,
        // onChange: () => setColumnFilter(key, { valueState: undefined }),
      },
    },
    {
      label: `Seleccionados (${selectedRows.length})`,
      inputHtmlAttrs: {
        // checked: valueState === 'value',
        // onChange: () => setColumnFilter(key, { valueState: 'value' }),
      },
    },
  ]

  return (
    <div className="cmp-toolbar">
      <div className="left">
        {Object.entries(TOGGLES_INFO).map(([key, props]) => (
          <Toggle
            key={key}
            value={toggles[key as ToggleKey]}
            onChange={handleToggleChange(key as ToggleKey)}
            {...props}
          />
        ))}
        {editModeState && (
          <Toggle
            handlingClass="edit-mode"
            title="Modo edición"
            iconClass="fa-solid fa-pen"
            value={editModeState[0]}
            setValue={editModeState[1]}
          />
        )}
        {/* <Button
          title="Simplificar coincidencias"
          iconClass="fa-solid fa-compress"
          size="s"
          border
          onAction={handleHiddenColumnMatches}
        /> */}
      </div>
      <div className="center ui-s">
        {columnFilters.length !== 0 && (
          <div className="filtered">
            <div className="field">
              {renderedRows.length}
              <Icon iconClass="fa-solid fa-filter" />
            </div>
            <Button
              title="Eliminar filtros"
              iconClass="fa-solid fa-xmark"
              size="s"
              border
              onAction={cleanFilters}
            />
          </div>
        )}
        <div className="field total">
          {dataLength}
          <Icon iconClass="fa-solid fa-cubes-stacked" />
        </div>
      </div>
      <div className="right">
        <Dropdown
          opener={attrs => (
            <Button
              text="Exportar"
              iconClass="fa-solid fa-file-arrow-down"
              size="s"
              border
              htmlAttrs={attrs}
            />
          )}
        >
          <Field title="Valores" render="fieldset" hideTitle>
            <OptionGroup
              name="selectionType"
              inputType="radio"
              size="s"
              {...{ options }}
            />
          </Field>
          <div className="actions">
            <ReportModal
              {...{
                renderedColumns,
                renderedRows,
                selectedRows,
                renderedCalcResults,
                selectedCalcResults,
              }}
            />
            <Button
              text="Excel"
              title="Descargar .xlsx"
              iconClass="fa-regular fa-file-excel"
              border
              bodyStretch
            />
            <Button
              text="Para IA"
              title="Copiar formato TOON"
              iconClass="fa-regular fa-copy"
              border
              bodyStretch
            />
          </div>
        </Dropdown>
      </div>
    </div>
  )
}
