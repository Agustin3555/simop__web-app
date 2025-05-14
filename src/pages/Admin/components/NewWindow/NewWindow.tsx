import { useEffect, useRef } from 'react'
import ReactDOM from 'react-dom/client'

const width = 800
const height = 600

interface NewWindowProps {
  title: string
  children: React.ReactNode
}

const NewWindow = ({ title, children }: NewWindowProps) => {
  const newWindow = useRef<Window | null>(null)
  const container = useRef<HTMLDivElement | null>(null)
  const rootRef = useRef<ReactDOM.Root | null>(null)

  useEffect(() => {
    // Abrir nueva ventana
    newWindow.current = window.open(
      '',
      '_blank',
      `width=${width},height=${height},resizable,scrollbars=yes,status=1`,
    )

    if (!newWindow.current) return

    newWindow.current.document.title = title
    container.current = newWindow.current.document.createElement('div')
    newWindow.current.document.body.appendChild(container.current)

    // Clonar los estilos CSS
    document
      .querySelectorAll('style, link[rel="stylesheet"]')
      .forEach(style => {
        newWindow.current?.document.head.appendChild(style.cloneNode(true))
      })

    // Crear el root para React en la ventana nueva
    rootRef.current = ReactDOM.createRoot(container.current)
    rootRef.current.render(children)

    return () => {
      rootRef.current?.unmount()
      newWindow.current?.close()
    }
  }, [children, title])

  return null
}

export default NewWindow
