import { styles } from './ReportInTable.style'
import { Report } from '@/pages/Admin/components'
import { Text, View, Image } from '@react-pdf/renderer'
import { ReactNode } from 'react'

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
  props = [{ title: 'CANTIDAD', values: [rows.length] }, ...props]

  return (
    <Report title={`Lista de ${schemeTitle}`} orientation="landscape">
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

      {graphs && (
        <View style={styles.graphs} break>
          {graphs.map(({ column, mode, img }, i) => (
            <View style={styles.graphItem} wrap={false}>
              <Text style={styles.column}>{column}</Text>
              <View style={styles.mode}>
                <Text>Por:</Text>
                <Text style={styles.modeValue}>{mode}</Text>
              </View>
              <Image key={i} style={styles.img} src={img} />
            </View>
          ))}
        </View>
      )}
    </Report>
  )
}

export default ReportInTable
