import { styles } from './Report.style'
import { Font, Image, Page, Text, View, Document } from '@react-pdf/renderer'
import { format } from '@formkit/tempo'
import { ReactNode } from 'react'

const fontFiles = import.meta.glob('@/assets/fonts/manrope_5.2.5/ttf/*.ttf', {
  eager: true,
}) as Record<string, { default: string }>

const fonts = Object.entries(fontFiles)
  .map(([path, module]) => {
    const weight = path.match(/manrope-latin-(\d+)-normal\.ttf$/)?.[1]
    return weight ? { src: module.default, fontWeight: Number(weight) } : null
  })
  .filter((f): f is { src: string; fontWeight: number } => f !== null)

Font.register({ family: 'Manrope Variable', fonts })

interface ReportProps {
  title: string
  children: ReactNode
}

const Report = ({ title, children }: ReportProps) => (
  <Document>
    <Page style={styles.page} size="A4" orientation="landscape">
      <View style={styles.header}>
        <Text style={styles.h1}>{title}</Text>
        <View style={styles.by}>
          <Image
            style={styles.logo}
            src="/isologotipo-gobierno-ministerio.png"
          />
          <View style={styles.separator} />
          <Text style={styles.subsecretaria}>
            Subsecretaría de Obras Públicas
          </Text>
        </View>
        <Text style={styles.date}>
          {format('', { date: 'short', time: 'short' })}
        </Text>
      </View>
      {children}
    </Page>
  </Document>
)

export default Report
