import { MutableRefObject, useCallback, useEffect, useState } from 'react'
import { useScheme } from '@/pages/Admin/hooks'
import { Button } from '@/components'
import { ReportInTable } from './components'
import domtoimage from 'dom-to-image'
import { pdf, PDFViewer } from '@react-pdf/renderer'

const generarImagenes = (element: HTMLElement) => {
  const children = Array.from(element.children)
  const chunkSize = 10

  const groups = Array.from(
    { length: Math.ceil(children.length / chunkSize) },
    (_, i) => children.slice(i * chunkSize, i * chunkSize + chunkSize),
  )

  const promises = groups.map(async grupo => {
    const wrapper = document.createElement('div')
    grupo.forEach(child => wrapper.appendChild(child.cloneNode(true)))

    Object.assign(wrapper.style, {
      display: 'flex',
      flexDirection: 'column',
    })

    const container = document.createElement('div')

    Object.assign(container.style, {
      position: 'absolute',
      top: '-9999px',
      overflow: 'scroll',
    })

    container.appendChild(wrapper)

    // Añadimos el contenedor al DOM temporalmente
    document.body.appendChild(container)

    const imgDataUrl = await domtoimage.toPng(wrapper)

    // Añadimos el contenedor al DOM temporalmente
    document.body.removeChild(container)

    return imgDataUrl
  })

  // Generar cada imagen en paralelo
  return Promise.all(promises)
}

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
    setLoading(true)

    if (!localQueryRef.current) return

    const tbodyElement =
      localQueryRef.current.querySelector<HTMLTableSectionElement>(
        'table > tbody',
      )
    if (!tbodyElement) return

    const imageUrls = await generarImagenes(tbodyElement)

    // const tableImgUrl = await domtoimage.toPng(tbodyElement)
    // setTableImgUrl(tableImgUrl)

    const blob = await pdf(
      <ReportInTable title={`Lista de ${title.plural}`} {...{ imageUrls }} />,
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
