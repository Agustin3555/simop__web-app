import domtoimage from 'dom-to-image'

type TSection = HTMLTableSectionElement

const CHUNK_SIZE = 10

export const generateTableImages = (tableElement: HTMLTableElement) => {
  const theadElement = tableElement.querySelector<TSection>('thead')
  const tbodyElement = tableElement.querySelector<TSection>('tbody')
  const tfootElement = tableElement.querySelector<TSection>('tfoot')

  if (!(theadElement && tbodyElement && tfootElement)) return

  const trElements = Array.from(tbodyElement.children) as HTMLTableRowElement[]

  const trGroups = Array.from(
    { length: Math.ceil(trElements.length / CHUNK_SIZE) },
    (_, i) => trElements.slice(i * CHUNK_SIZE, i * CHUNK_SIZE + CHUNK_SIZE),
  )

  const generators = trGroups.map(async (trElements, i) => {
    const auxTableElement = document.createElement('table')

    Object.assign(auxTableElement.style, {
      display: 'flex',
      flexDirection: 'column',
    })

    if (i === 0) auxTableElement.appendChild(theadElement.cloneNode(true))

    trElements.forEach(item =>
      auxTableElement.appendChild(item.cloneNode(true)),
    )

    if (i === trGroups.length - 1)
      auxTableElement.appendChild(tfootElement.cloneNode(true))

    const container = document.createElement('div')

    Object.assign(container.style, {
      position: 'absolute',
      top: '500rem',
      overflow: 'scroll',
    })

    container.appendChild(auxTableElement)

    document.body.appendChild(container)

    const imageUrl = await domtoimage.toPng(auxTableElement)

    document.body.removeChild(container)

    return imageUrl
  })

  // Genera cada imagen en paralelo
  return Promise.all(generators)
}
