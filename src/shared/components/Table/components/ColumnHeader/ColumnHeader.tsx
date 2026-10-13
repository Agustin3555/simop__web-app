import './ColumnHeader.css'
import { useRef } from 'react'
import { useSortable } from '@dnd-kit/react/sortable'
import { useTable } from '../../contexts/Table/useTable.hook'
import { Button, Toggle } from '@/components'
import { FilterMenu, SizeInput, SortButton } from './components'
import { ColumnBehavior } from '@/shared/core/types'
import { classList } from '@/helpers'

interface ColumnHeaderProps {
  propBuilders: ColumnBehavior
  index?: number
  control?: boolean
  hidden?: boolean
}

export const ColumnHeader = ({
  propBuilders,
  index,
  control = true,
  hidden = false,
}: ColumnHeaderProps) => {
  const {
    def: {
      key,
      title,
      columnConfig: { size },
    },
  } = propBuilders

  const setColumnVisibility = useTable(s => s.setColumnVisibility)
  const gripAreaRef = useRef<HTMLDivElement>(null)

  const { ref, isDragging } = useSortable({
    id: key,
    index: index ?? 0,
    handle: gripAreaRef,
  })

  return (
    <div
      className={classList('cmp-column-header', { hidden, isDragging })}
      style={hidden ? undefined : { width: `var(--col-${key}-size)` }}
      {...{ ref }}
    >
      {control && (
        <div className="header">
          {!hidden && (
            <div className="grip-area" ref={gripAreaRef}>
              <span />
            </div>
          )}
          <Button
            title={hidden ? 'Mostrar' : 'Ocultar'}
            faIcon={`fa-solid fa-eye${hidden ? '' : '-slash'}`}
            size="s"
            type="secondary"
            inverted
            onAction={() => setColumnVisibility(key, hidden)}
          />
        </div>
      )}
      <div className="main">
        <h2 className="text">{title}</h2>
        {!hidden && (
          <div className="actions">
            <Toggle title="Graficar" faIcon="fa-solid fa-chart-pie" />
            <SortButton {...{ propBuilders }} />
            <FilterMenu {...{ propBuilders }} />
          </div>
        )}
      </div>
      {control && !hidden && <SizeInput columnKey={key} initSize={size!} />}
    </div>
  )
}
