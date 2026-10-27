import { styles } from './ReportInTable.style'
import { ReactNode, useMemo } from 'react'
import { useConfig } from '../../store'
import { Text, View, Image } from '@react-pdf/renderer'
import Report from '../Report/Report'
import { palColor } from '@/styles/palette'

const ROW_NUMBER_WIDTH = 16

const getParagraphs = (block: string) => {
  if (!block) return []
  return block
    .split(/\n/)
    .map(f => f.trim())
    .filter(f => f.length > 0)
}

export interface GraphInfo {
  column: string
  mode: string
}

export interface FilterProp {
  label: string
  values: (number | string)[]
}

export interface ReportInTableProps {
  title: string
  props?: FilterProp[]
  columns: { title: string; size: number }[]
  rows: ReactNode[][]
  footer: ({ label: string; cell: ReactNode } | undefined)[]
  graphs?: (GraphInfo & { img: string })[]
  rowNumber: boolean
}

const ReportInTable = ({
  title,
  props = [],
  columns,
  rows,
  footer,
  graphs,
  rowNumber,
}: ReportInTableProps) => {
  props = [{ label: 'CANTIDAD', values: [rows.length] }, ...props]

  const commentsReports = useConfig(s => s.config.commentsReports)

  const [topComments, botComments] = useMemo(() => {
    if (typeof commentsReports !== 'string') return [[], []]

    const blocks = commentsReports.split(/\n\s*\n/)
    const top = getParagraphs(blocks[0])
    const bot = getParagraphs(blocks[1])
    return [top, bot]
  }, [commentsReports])

  return (
    <Report orientation="landscape" {...{ title, topComments, botComments }}>
      <View style={styles.props}>
        {props.map(({ label: title, values }, i) => (
          <View key={i} style={styles.item}>
            <Text style={styles.title}>{title}:</Text>
            <View style={styles.values}>
              {values.map((value, j) => (
                <View key={j} style={styles.valueContainer}>
                  <Text>{value}</Text>
                </View>
              ))}
            </View>
          </View>
        ))}
      </View>
      <View style={styles.table}>
        <View style={styles.header} fixed>
          {rowNumber && (
            <View
              key="rowNumber"
              style={{ ...styles.cell, width: ROW_NUMBER_WIDTH }}
            >
              <Text>#</Text>
            </View>
          )}
          {columns.map(({ title, size }, i) => (
            <View key={i} style={{ ...styles.cell, width: size }}>
              <Text>{title}</Text>
            </View>
          ))}
        </View>
        <View style={styles.body}>
          {rows.map((row, i) => (
            <View
              key={i}
              wrap={false}
              style={{
                ...styles.row,
                ...(i !== rows.length - 1 && {
                  borderBottomWidth: 1,
                  borderColor: palColor('AL4'),
                }),
              }}
            >
              {rowNumber && (
                <View
                  key="rowNumber"
                  style={{ ...styles.cell, width: ROW_NUMBER_WIDTH }}
                >
                  <Text>{i + 1}</Text>
                </View>
              )}
              {row.map((value, j) => (
                <View
                  key={j}
                  style={{ ...styles.cell, width: columns[j].size }}
                >
                  {value}
                </View>
              ))}
            </View>
          ))}
        </View>
        <View style={[styles.row, styles.calcs]}>
          {rowNumber && (
            <View
              key="rowNumber"
              style={{ ...styles.cell, width: ROW_NUMBER_WIDTH }}
            ></View>
          )}
          {footer.map((f, i) => (
            <View key={i} style={{ width: columns[i].size }}>
              {f && (
                <View style={styles.calcContentItem}>
                  <Text style={styles.calcContentItem_label}>{f.label}</Text>
                  {f.cell}
                </View>
              )}
            </View>
          ))}
        </View>
      </View>
      {graphs?.map(({ column, mode, img }, i) => (
        <View key={i} style={styles.graphItem} wrap={false} break>
          <Text style={styles.column}>{column}</Text>
          <View style={styles.mode}>
            <Text>Por:</Text>
            <Text style={styles.modeValue}>{mode}</Text>
          </View>
          <Image key={i} style={styles.img} src={img} />
        </View>
      ))}
    </Report>
  )
}

export default ReportInTable
