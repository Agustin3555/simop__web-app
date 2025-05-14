import { captureElementImage } from '.'

const CHUNK_ROWS = 10
const CHUNK_COLS = 8

export const generateTableImages = (tableElement: HTMLElement) => {
  const headElement = tableElement.querySelector<HTMLElement>('& > .head')
  const bodyElement = tableElement.querySelector<HTMLElement>('& > .body')
  const footElement = tableElement.querySelector<HTMLElement>('& > .foot')

  if (!(headElement && bodyElement && footElement)) return

  const bodyRows = Array.from(bodyElement.children) as HTMLElement[]
  const headRow = headElement.children[0] as HTMLElement
  const footRow = footElement.children[0] as HTMLElement

  const colCount = headRow?.children.length ?? 0

  const colGroups = Array.from(
    { length: Math.ceil(colCount / CHUNK_COLS) },
    (_, i) => {
      const start = i * CHUNK_COLS
      return { start, end: start + CHUNK_COLS }
    },
  )

  const rowGroups = Array.from(
    { length: Math.ceil(bodyRows.length / CHUNK_ROWS) },
    (_, i) => bodyRows.slice(i * CHUNK_ROWS, i * CHUNK_ROWS + CHUNK_ROWS),
  )

  const generators = rowGroups.flatMap((rows, rowIndex) =>
    colGroups.map(async ({ start, end }) => {
      const auxTable = document.createElement('div')
      auxTable.classList.add('table')

      const clonePartialRow = (sourceRow: HTMLElement) => {
        const newRow = document.createElement(sourceRow.tagName)
        newRow.className = sourceRow.className

        const children = Array.from(sourceRow.children)

        // Siempre incluye la primera y segunda columnas si existen
        if (children[0]) newRow.appendChild(children[0].cloneNode(true))
        if (children[1]) newRow.appendChild(children[1].cloneNode(true))

        // Luego incluye el resto del grupo, evitando duplicar 0 y 1
        children.slice(start, end).forEach((cell, i) => {
          const cellIndex = start + i

          if (cellIndex !== 0 && cellIndex !== 1)
            newRow.appendChild(cell.cloneNode(true))
        })

        return newRow
      }

      const auxHead = document.createElement('div')
      auxHead.classList.add('head')
      auxHead.appendChild(clonePartialRow(headRow))

      auxTable.appendChild(auxHead)

      const auxBody = document.createElement('div')
      auxBody.classList.add('body')

      rows.forEach(row => auxBody.appendChild(clonePartialRow(row)))
      auxTable.appendChild(auxBody)

      if (rowIndex === rowGroups.length - 1) {
        const auxFoot = document.createElement('div')
        auxFoot.classList.add('foot')
        auxFoot.appendChild(clonePartialRow(footRow))

        auxTable.appendChild(auxFoot)
      }

      const container = document.createElement('div')
      container.classList.add('capture-container')

      container.appendChild(auxTable)

      document.body.appendChild(container)

      const imageUrl = await captureElementImage(auxTable)

      // document.body.removeChild(container)

      return imageUrl
    }),
  )

  // Genera cada imagen en paralelo
  return Promise.all(generators)
}
