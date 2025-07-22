import { LooseEntity } from '@/models/config'
import { Report } from '@/pages/Admin/components'
import { Text, View } from '@react-pdf/renderer'
import { styles } from './ReportInTable2.style'

interface ReportInTableProps {
  data: LooseEntity[]
  schemeTitle: string
}

const ReportInTable = ({ data, schemeTitle }: ReportInTableProps) => (
  <Report title={`Lista de ${schemeTitle}`} orientation="landscape">
    <View style={styles.table}>
      {data.map(item => (
        <View key={item.id} style={styles.row}>
          {Object.values(item).map(value => (
            <View style={styles.cell}>
              <Text>{JSON.stringify(value)}</Text>
            </View>
          ))}
        </View>
      ))}
    </View>
  </Report>
)

export default ReportInTable
