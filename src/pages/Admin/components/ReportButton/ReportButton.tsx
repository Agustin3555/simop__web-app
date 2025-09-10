import { useHandleAction } from '@/hooks'
import { Button } from '@/components'
import { pdf } from '@react-pdf/renderer'
import { ReactNode, useCallback, useMemo, useState } from 'react'
import { sleep } from '@/helpers'
import {
  useConfigModule,
  useGraphScreenshots,
  useMetaModel,
  useTable,
} from '../../hooks'
import { ReportInTable } from '..'
import { steppedSizes } from '../Table/helpers'
import { FilterProp } from '../ReportInTable/ReportInTable'

const ReportButton = () => {
  const [progress, setProgress] = useState(0)

  const { title, getProps } = useMetaModel()
  const { selectedConfig } = useConfigModule()

  const { table, states } = useTable()
  const { selectedRowIds, accessorKeys } = states

  const { captures, captureInfoRef, takeCapture } = useGraphScreenshots()

  const selectedProps = useMemo(() => getProps(selectedConfig.columns), [])

  const generateReport = useCallback(async () => {
    if (!table) return

    setProgress(0)

    const tableData = table
      .getSortedRowModel()
      .rows.map(({ original }) => original)

    const selectedData =
      selectedRowIds.length === 0
        ? tableData
        : tableData.filter(({ id }) => selectedRowIds.includes(id))

    // Obtener columnas visibles y en orden
    const visibleColumns = table.getVisibleLeafColumns()
    const visibleColumnIds = visibleColumns.map(column => column.id)

    // Filtrar solo los props visibles y en el orden correcto
    const visibleProps = selectedProps
      .filter(prop => visibleColumnIds.includes(prop.key))
      .sort(
        (a, b) =>
          visibleColumnIds.indexOf(a.key) - visibleColumnIds.indexOf(b.key),
      )

    const props = visibleColumns
      .map(column => {
        const { getReportTableFilter } =
          selectedProps.find(({ key }) => key === column.id) ?? {}

        if (!getReportTableFilter) return

        return getReportTableFilter(
          column,
          table.options.data,
          accessorKeys[column.id],
        )
      })
      .filter(Boolean) as FilterProp[]

    const header = visibleProps.map(({ title, minSize }, i) => ({
      title,
      size: steppedSizes(minSize, visibleColumns[i + 1].getSize()) / 2.6,
    }))

    const total = selectedData.length
    const rows: ReactNode[][] = []

    for (let i = 0; i < selectedData.length; i++) {
      const row = visibleProps.map(({ key, getReportTableCell }) =>
        getReportTableCell(selectedData[i], accessorKeys[key]),
      )

      rows.push(row)
      setProgress(((i + 1) / total) * 100)
      if (i % 10 === 0) await sleep()
    }

    const imgs = await takeCapture()

    const graphs = captures.map((fieldKey, i) => ({
      ...captureInfoRef.current[fieldKey],
      img: imgs[i],
    }))

    return (
      <ReportInTable
        schemeTitle={title.plural}
        {...{ props, header, rows, graphs }}
      />
    )
  }, [table, selectedRowIds, accessorKeys, captures])

  const actionResult = useHandleAction(async ({ setError, setSuccess }) => {
    try {
      const component = await generateReport()
      if (!component) return

      const blob = await pdf(component).toBlob()

      const pdfUrl = URL.createObjectURL(blob)
      window.open(pdfUrl, '_blank')

      await setSuccess()
    } catch (error) {
      await setError()
    }
    setProgress(0)
  })

  return (
    <Button
      title="Generar informe"
      text="Informe"
      faIcon="fa-solid fa-file-pdf"
      type="secondary"
      {...{ progress, ...actionResult }}
    />
  )
}

export default ReportButton
