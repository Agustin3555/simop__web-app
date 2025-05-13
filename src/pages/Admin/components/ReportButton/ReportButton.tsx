import { useHandleAction } from '@/hooks'
import { Button } from '@/components'
import { DocumentProps, pdf } from '@react-pdf/renderer'
import { ReactElement } from 'react'

interface ReportButtonProps {
  onGenerate: () => Promise<ReactElement<DocumentProps> | undefined>
}

const ReportButton = ({ onGenerate: onClick }: ReportButtonProps) => {
  const actionResult = useHandleAction(async ({ setError, setSuccess }) => {
    try {
      const component = await onClick()
      if (!component) return

      const blob = await pdf(component).toBlob()

      const pdfUrl = URL.createObjectURL(blob)
      window.open(pdfUrl, '_blank')

      await setSuccess()
    } catch (error) {
      await setError()
    }
  })

  return (
    <Button
      text="Informe"
      faIcon="fa-solid fa-file-pdf"
      type="secondary"
      {...actionResult}
    />
  )
}

export default ReportButton
