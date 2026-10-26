import './ReportModal.css'
import { useCallback, useMemo, useState } from 'react'
import { useSubmitAction } from '@/hooks'
import { useTableDef } from '@/pages/Admin/hooks/useTableDef.hook'
import { useTable } from '@/shared/components/Table/contexts/Table/useTable.hook'
import { Modal } from '@/shared/components/Modal/Modal'
import { Button, Input } from '@/components'
import { pdf } from '@react-pdf/renderer'
import { sleep } from '@/helpers'
import ReportInTable, {
  ReportInTableProps,
} from '@/pages/Admin/components/ReportInTable/ReportInTable'
import { ColumnBehavior } from '@/shared/core/types'
import { CalcResults } from '@/shared/components/Table/hooks/useTableModel.hook'

type SelectionType = 'rendered' | 'selected'

interface GenerateReportConfig {
  title: string
  selectionType: SelectionType
  rowNumber: boolean
}

interface ReportModalProps {
  renderedColumns: ColumnBehavior[]
  renderedRows: { key: string; row: Record<string, unknown> }[]
  selectedRows: { key: string; row: Record<string, unknown> }[]
  calcResults: CalcResults
}

export const ReportModal = ({
  renderedColumns,
  renderedRows,
  selectedRows,
  calcResults,
}: ReportModalProps) => {
  const [progress, setProgress] = useState(0)

  const rowTypes = useMemo<
    Record<SelectionType, { key: string; row: Record<string, unknown> }[]>
  >(
    () => ({ rendered: renderedRows, selected: selectedRows }),
    [renderedRows, selectedRows],
  )

  const {
    tableDef: { title },
    columns: columnBehaviors,
  } = useTableDef()

  const columnWidths = useTable(s => s.columnWidths)
  const columnFilters = useTable(s => s.columnFilters)

  const generateReport = useCallback(
    async ({ title, selectionType, rowNumber }: GenerateReportConfig) => {
      setProgress(0)

      const filters = columnFilters
        .map(({ columnKey: key, filters: allFilters }) => {
          const column = columnBehaviors.find(f => f.usefulDef.key === key)
          if (!column) return

          const { valueState, custom } = allFilters
          // TODO: agregar el filtro de valueState

          // TODO: agregar las refs de tanstack query cuando sea del tipo ref
          return column.getReportTableFilter(custom)
        })
        .filter(Boolean) as ReportInTableProps['props']

      const columns: ReportInTableProps['columns'] = renderedColumns.map(
        ({ usefulDef: { key, title } }) => ({
          title,
          size:
            (columnWidths.find(c => c.columnKey === key)!.points * 16) / 2.6,
        }),
      )

      const footer: ReportInTableProps['footer'] = renderedColumns.map(
        ({ getReportTableCell }, i) => {
          const calcResult = calcResults[i]
          if (!calcResult) return

          const { label, result } = calcResult
          return { label, cell: getReportTableCell(result) }
        },
      )

      const rows: ReportInTableProps['rows'] = []
      const selectedRows = rowTypes[selectionType]
      const total = selectedRows.length

      for (let i = 0; i < total; i++) {
        const r = selectedRows[i]

        const cells = renderedColumns.map(({ usefulDef, getReportTableCell }) =>
          getReportTableCell(r.row[usefulDef.key]),
        )

        rows.push(cells)
        setProgress(((i + 1) / total) * 100)
        if (i % 10 === 0) await sleep()
      }

      return (
        <ReportInTable
          props={filters}
          {...{ title, columns, rows, footer, rowNumber }}
        />
      )
    },
    [
      calcResults,
      columnBehaviors,
      columnFilters,
      columnWidths,
      renderedColumns,
      rowTypes,
    ],
  )

  const { handleSubmit, actionState } = useSubmitAction(
    async ({ formValues, setError, setSuccess }) => {
      try {
        const config = {
          title: formValues.get.string('title'),
          selectionType: formValues.get.string(
            'selectionType',
          ) as SelectionType,
          rowNumber: formValues.get.boolean('rowNumber'),
        }

        console.log(config)

        const component = await generateReport(config)
        if (!component) return

        const blob = await pdf(component).toBlob()
        const pdfUrl = URL.createObjectURL(blob)
        window.open(pdfUrl, '_blank')

        await setSuccess()
      } catch (error) {
        await setError()
      } finally {
        setProgress(0)
      }
    },
  )

  return (
    <Modal
      handlingClass="cmp-report-modal"
      opener={attrs => (
        <Button
          text="Informe"
          faIcon="fa-regular fa-file-pdf"
          size="s"
          type="secondary"
          buttonHTMLAttrs={attrs}
        />
      )}
    >
      <form onSubmit={handleSubmit}>
        <Input
          keyName="title"
          title="Título"
          value={`Lista de ${title.plural}`}
        />
        <fieldset className="selection-type">
          <legend>Incluir filas</legend>
          <label>
            <input
              type="radio"
              name="selectionType"
              value="rendered"
              defaultChecked
            />
            En vista ({renderedRows.length})
          </label>
          <label>
            <input type="radio" name="selectionType" value="selected" />
            Seleccionadas ({selectedRows.length})
          </label>
        </fieldset>
        <label>
          <input type="checkbox" name="rowNumber" defaultChecked />
          Columna índice
        </label>
        <Button
          text="Generar"
          faIcon="fa-regular fa-file-pdf"
          size="m"
          submit
          {...{ progress, actionState }}
        />
      </form>
    </Modal>
  )
}
