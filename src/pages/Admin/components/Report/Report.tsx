import { styles } from './Report.style'
import { Font, Image, Page, Text, View, Document } from '@react-pdf/renderer'
import { Orientation } from '@react-pdf/types'
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
// Desactiva completamente los guiones entre palabras
Font.registerHyphenationCallback(word => [word])

interface ReportProps {
  title: string
  orientation?: Orientation
  children: ReactNode
}

const Report = ({ title, orientation = 'portrait', children }: ReportProps) => (
  <Document>
    <Page style={styles.page} size="A4" {...{ orientation }}>
      <View style={styles.header} fixed>
        <View style={styles.group}>
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
          <View style={styles.right}>
            <Text style={styles.date}>
              {format('', { date: 'short', time: 'short' })}
            </Text>
            <View style={styles.pagination}>
              <Text
                style={styles.pageNumber}
                render={({ pageNumber }) => pageNumber}
              />
              <View style={styles.paginationSeparator} />
              <Text render={({ totalPages }) => totalPages} />
            </View>
          </View>
        </View>
        <Text style={styles.warning}>
          Estos datos corresponden a gestión administrativa. Por cuestiones
          burocráticas podría diferir con el avance real de la obra y la
          disponibilidad presupuestaria.
        </Text>
      </View>
      <View style={styles.content}>{children}</View>
      <Text style={styles.warning} fixed>
        Las obras con expedientes electrónicos están confirmadas. Y las obras
        con expedientes en papel están sujetas a revisión.
      </Text>
    </Page>
  </Document>
)

export default Report
