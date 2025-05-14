import { useHandleAction } from '@/hooks'
import { Button } from '@/components'
import { DocumentProps, pdf } from '@react-pdf/renderer'
import { ReactElement } from 'react'
import { ButtonProps } from '@/components/Button/Button'

interface ReportButtonProps extends Pick<ButtonProps, 'progress'> {
  onGenerate: () => Promise<ReactElement<DocumentProps> | undefined>
}

const ReportButton = ({ progress, onGenerate }: ReportButtonProps) => {
  const actionResult = useHandleAction(async ({ setError, setSuccess }) => {
    try {
      const component = await onGenerate()
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
      {...{ progress, ...actionResult }}
    />
  )
}

export default ReportButton
