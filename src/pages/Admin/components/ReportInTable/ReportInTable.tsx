import { styles } from './ReportInTable.style'
import { ReactNode, useMemo } from 'react'
import { useConfig } from '../../store'
import { Report } from '@/pages/Admin/components'
import { Text, View, Image } from '@react-pdf/renderer'

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
  title: string
  values: (number | string)[]
}

interface ReportInTableProps {
  schemeTitle: string
  props?: FilterProp[]
  header: { title: string; size: number }[]
  rows: ReactNode[][]
  graphs?: (GraphInfo & { img: string })[]
}

const ReportInTable = ({
  schemeTitle,
  props = [],
  header,
  rows,
  graphs,
}: ReportInTableProps) => {
  const commentsReports = useConfig(s => s.config.commentsReports)

  const [topComments, botComments] = useMemo(() => {
    if (typeof commentsReports !== 'string') return [[], []]

    const blocks = commentsReports.split(/\n\s*\n/)
    const top = getParagraphs(blocks[0])
    const bot = getParagraphs(blocks[1])
    return [top, bot]
  }, [commentsReports])

  props = [{ title: 'CANTIDAD', values: [rows.length] }, ...props]

  return (
    <Report
      title={`Lista de ${schemeTitle}`}
      orientation="landscape"
      {...{ topComments, botComments }}
    >
      <View style={styles.props}>
        {props.map(({ title, values }, i) => (
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
          {header.map(({ title, size }, i) => (
            <View key={i} style={{ ...styles.cell, width: size }}>
              <Text>{title}</Text>
            </View>
          ))}
        </View>
        <View style={styles.body}>
          {rows.map((row, i) => (
            <View key={i} style={styles.row} wrap={false}>
              {row.map((value, j) => (
                <View key={j} style={{ ...styles.cell, width: header[j].size }}>
                  {value}
                </View>
              ))}
            </View>
          ))}
        </View>
      </View>
      {graphs?.map(({ column, mode, img }, i) => (
        <View style={styles.graphItem} wrap={false} break>
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
