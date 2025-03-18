import { MutableRefObject, useCallback, useEffect, useState } from 'react'
import { useScheme } from '@/pages/Admin/hooks'
import { Button } from '@/components'
import { Report } from './components'
import domtoimage from 'dom-to-image'
import { pdf, PDFViewer } from '@react-pdf/renderer'

interface ReportButtonProps {
  localQueryRef: MutableRefObject<HTMLDivElement | null>
}

const DownloadReportButton = ({ localQueryRef }: ReportButtonProps) => {
  const { scheme } = useScheme()
  const { title } = scheme
  // const { title } = { title: { plural: 'Empresas' } }

  const [loading, setLoading] = useState(false)
  const [tableImgUrl, setTableImgUrl] = useState<string>()
  const [key, setKey] = useState(0)

  const handleClick = useCallback(async () => {
    if (!localQueryRef.current) return

    const tableElement = localQueryRef.current.querySelector('table')
    if (!tableElement) return

    setLoading(true)

    const tableImgUrl = await domtoimage.toPng(tableElement)
    setTableImgUrl(tableImgUrl)

    const blob = await pdf(
      <Report title={`Lista de ${title.plural}`} {...{ tableImgUrl }} />,
    ).toBlob()
    const pdfUrl = URL.createObjectURL(blob)

    window.open(pdfUrl, '_blank')

    // const link = document.createElement('a')

    // link.href = pdfUrl
    // link.download = `${title.plural}.pdf` // Nombre del archivo
    // document.body.appendChild(link)
    // link.click()
    // document.body.removeChild(link)

    setLoading(false)
  }, [])

  // useEffect(() => {
  //   const { hot } = import.meta
  //   if (hot) hot.accept(() => setKey(prev => prev + 1))
  // }, [])

  return (
    <>
      <Button
        text="Informe"
        faIcon="fa-solid fa-file-pdf"
        _type="secondary"
        onClick={handleClick}
      />
      {/* <PDFViewer key={key} width="100%" height="450px">
        <Report title={title.plural} {...{ tableImgUrl }} />
      </PDFViewer> */}
    </>
  )
}

export default DownloadReportButton
