import { ReactNode } from 'react'
import { createRoot } from 'react-dom/client'

interface NewWindowProps {
  title: string
  content: ReactNode
  width?: number
  height?: number
}

export const newWindow = ({
  title,
  content,
  width = 800,
  height = 600,
}: NewWindowProps) => {
  const newWindow = window.open(
    '',
    title,
    `width=${width}, height=${height}, left=200, top=200`,
  )

  if (!newWindow) return

  newWindow.document.title = title

  // Clona los estilos CSS
  document.querySelectorAll('style, link[rel="stylesheet"]').forEach(style => {
    newWindow.document.head.appendChild(style.cloneNode(true))
  })

  const container = newWindow.document.createElement('div')

  newWindow.document.body.appendChild(container)

  const root = createRoot(container)
  root.render(content)
}
