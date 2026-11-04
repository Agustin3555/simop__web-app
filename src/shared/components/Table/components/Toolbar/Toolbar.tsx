import './Toolbar.css'
import { useTable } from '../../contexts/Table/useTable.hook'
import { Dispatch, SetStateAction } from 'react'
import { Button, Toggle } from '@/components'
import { ToggleProps } from '@/components/Toggle/Toggle'
import Value from '@/pages/Admin/components/Value/Value'
import { ReportModal } from './components'
import { ColumnBehavior } from '@/shared/core/types'
import { CalcResults } from '../../hooks/useTableModel.hook'
import { Dropdown } from '@/shared/components/Dropdown/Dropdown'

export type ToggleKey = 'columnControl' | 'stickHeader' | 'stickFooter'
export type TogglesState = Record<ToggleKey, boolean>

const TOGGLES_INFO: Record<
  ToggleKey,
  Required<Pick<ToggleProps, 'title' | 'faIcon'>>
> = {
  columnControl: {
    title: 'Controlar columnas',
    faIcon: 'fa-solid fa-table-columns',
  },
  stickHeader: {
    title: 'Fijar cabecera de tabla',
    faIcon: 'fa-regular fa-window-maximize',
  },
  stickFooter: {
    title: 'Fijar pie de tabla',
    faIcon: 'fa-regular fa-window-maximize fa-rotate-180',
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

  return (
    <div className="new-cmp-toolbar">
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
            faIcon="fa-solid fa-pen"
            value={editModeState[0]}
            setValue={editModeState[1]}
          />
        )}
        {/* <Button
          title="Simplificar coincidencias"
          faIcon="fa-solid fa-compress"
          size="s"
          type="secondary"
          onAction={handleHiddenColumnMatches}
        /> */}
      </div>
      <div className="center">
        {columnFilters.length !== 0 && (
          <>
            <Value
              text={renderedRows.length}
              faIcon="fa-solid fa-filter"
              size="s"
              type="secondary"
              pill
            />
            <Button
              title="Limpiar filtros"
              faIcon="fa-solid fa-xmark"
              size="s"
              type="secondary"
              onAction={cleanFilters}
            />
          </>
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
        <Dropdown
          opener={attrs => (
            <Button
              text="Exportar"
              faIcon="fa-solid fa-file-arrow-down"
              size="s"
              type="secondary"
              buttonHTMLAttrs={attrs}
            />
          )}
        >
          {/* TODO: Toggle para elegir si exportar filas seleccionadas o todas */}
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
            faIcon="fa-regular fa-file-excel"
            type="secondary"
          />
          <Button
            text="Para IA"
            title="Copiar formato TOON"
            faIcon="fa-regular fa-copy"
            type="secondary"
          />
        </Dropdown>
      </div>
    </div>
  )
}
