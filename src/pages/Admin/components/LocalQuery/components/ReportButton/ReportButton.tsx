import { MutableRefObject } from 'react'
import { useHandleAction } from '@/hooks'
import { useScheme } from '@/pages/Admin/hooks'
import { Button2 } from '@/components'
import { ReportInTable } from './components'
import { generateTableImages } from '@/pages/Admin/helpers'
import { pdf } from '@react-pdf/renderer'

interface ReportButtonProps {
  localQueryRef: MutableRefObject<HTMLDivElement | null>
}

const ReportButton = ({ localQueryRef }: ReportButtonProps) => {
  const { scheme } = useScheme()
  const { title } = scheme

  // const [key, setKey] = useState(0)
  // const [imageUrls, setImageUrls] = useState<string[]>()

  const submitActionResult = useHandleAction(
    async ({ setError, setSuccess }) => {
      try {
        if (!localQueryRef.current) return

        const localQueryElement = localQueryRef.current

        const tableElement =
          localQueryElement.querySelector<HTMLElement>('.table')

        if (!tableElement) return

        const imageUrls = await generateTableImages(tableElement)
        // setImageUrls(imageUrls)

        if (!imageUrls) return

        const blob = await pdf(
          <ReportInTable schemeTitle={title.plural} {...{ imageUrls }} />,
        ).toBlob()

        const pdfUrl = URL.createObjectURL(blob)
        window.open(pdfUrl, '_blank')

        await setSuccess()
      } catch (error) {
        await setError()
      }
    },
  )

  // useEffect(() => {
  //   const { hot } = import.meta
  //   if (hot) hot.accept(() => setKey(prev => prev + 1))
  // }, [])

  return (
    <>
      <Button2
        text="Informe"
        faIcon="fa-solid fa-file-pdf"
        type="secondary"
        {...submitActionResult}
      />
      {/* <PDFViewer key={key} width="100%" height="420px">
        {imageUrls && (
          <ReportInTable
            title={`Lista de ${title.plural}`}
            {...{ imageUrls }}
          />
        )}
      </PDFViewer> */}
    </>
  )
}

export default ReportButton
