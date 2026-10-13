import './Toolbar.css'
import { useTable } from '../../contexts/Table/useTable.hook'
import { Dispatch, SetStateAction } from 'react'
import { Button, Toggle } from '@/components'
import { ToggleProps } from '@/components/Toggle/Toggle'
import { Value } from '@/pages/Admin/components'

export type ToggleKey = 'columnControl' | 'stickHeader' | 'stickFooter'

const toggles: Record<
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

export type ToggleStates = Record<ToggleKey, boolean>

export interface ToolbarProps {
  filteredDataLength: number
  dataLength: number
  toggleStates: ToggleStates
  setToggleStates: Dispatch<SetStateAction<ToggleStates>>
}

export const Toolbar = ({
  filteredDataLength,
  dataLength,
  toggleStates,
  setToggleStates,
}: ToolbarProps) => {
  const cleanFilters = useTable(s => s.cleanFilters)

  const handleToggleChange = (key: ToggleKey) => () => {
    setToggleStates(prev => ({ ...prev, [key]: !toggleStates[key] }))
  }

  return (
    <div className="new-cmp-toolbar">
      <div className="left">
        {Object.entries(toggles).map(([key, props]) => (
          <Toggle
            key={key}
            value={toggleStates[key as ToggleKey]}
            onChange={handleToggleChange(key as ToggleKey)}
            {...props}
          />
        ))}
        {/* <Button
          title="Simplificar coincidencias"
          faIcon="fa-solid fa-compress"
          size="s"
          type="secondary"
          onAction={handleHiddenColumnMatches}
        /> */}
      </div>
      <div className="center">
        {filteredDataLength !== dataLength && (
          <>
            <Value
              text={filteredDataLength}
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
        <Button
          text="Excel"
          title="Descargar Excel"
          faIcon="fa-solid fa-file-arrow-down"
          size="s"
          type="secondary"
        />
      </div>
    </div>
  )
}
