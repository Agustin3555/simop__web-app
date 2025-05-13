import { Report } from '@/pages/Admin/components'
import { Image } from '@react-pdf/renderer'

interface ReportInTableProps {
  schemeTitle: string
  imageUrls: string[]
}

const ReportInTable = ({ schemeTitle, imageUrls }: ReportInTableProps) => (
  <Report title={`Lista de ${schemeTitle}`} orientation="landscape">
    {imageUrls.map((src, i) => (
      <Image {...{ src }} break={i !== 0} />
    ))}
  </Report>
)

export default ReportInTable
