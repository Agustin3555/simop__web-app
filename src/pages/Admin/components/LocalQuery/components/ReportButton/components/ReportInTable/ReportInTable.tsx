import { Report } from '@/pages/Admin/components'
import { Image } from '@react-pdf/renderer'

interface ReportInTableProps {
  title: string
  imageUrls: string[]
}

const ReportInTable = ({ title, imageUrls }: ReportInTableProps) => {
  return (
    <Report {...{ title }}>
      {imageUrls.map((src, index) => (
        <Image {...{ src }} break={index !== 0} />
      ))}
    </Report>
  )
}

export default ReportInTable
