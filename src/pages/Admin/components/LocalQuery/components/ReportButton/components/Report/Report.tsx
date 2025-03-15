import { styles } from './Report.style'
import { Image, Page, Text, View, Document } from '@react-pdf/renderer'
import { format } from '@formkit/tempo'

interface ReportProps {
  title: string
  tableImgUrl: string
}

const Report = ({ title, tableImgUrl }: ReportProps) => (
  <Document>
    <Page style={styles.page} size="A4" orientation="landscape">
      <View style={styles.header}>
        <Text style={styles.h1}>{title}</Text>
        <Image style={styles.logo} src="/isologotipo-gobierno-ministerio.png" />
        <Text style={styles.date}>
          {format('', { date: 'short', time: 'short' })}
        </Text>
      </View>
      <Image style={styles.tableImg} src={tableImgUrl} />
    </Page>
  </Document>
)

export default Report
