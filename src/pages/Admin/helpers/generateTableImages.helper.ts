import domtoimage from 'dom-to-image'

const CHUNK_SIZE = 10

export const generateTableImages = (tableElement: HTMLElement) => {
  const headElement = tableElement.querySelector<HTMLElement>('.head')
  const bodyElement = tableElement.querySelector<HTMLElement>('.body')
  const footElement = tableElement.querySelector<HTMLElement>('.foot')

  if (!(headElement && bodyElement && footElement)) return

  const rowElements = Array.from(bodyElement.children) as HTMLElement[]

  const trGroups = Array.from(
    { length: Math.ceil(rowElements.length / CHUNK_SIZE) },
    (_, i) => rowElements.slice(i * CHUNK_SIZE, i * CHUNK_SIZE + CHUNK_SIZE),
  )

  const generators = trGroups.map(async (rowElements, i) => {
    const auxTableElement = document.createElement('div')
    auxTableElement.classList.add('table')

    auxTableElement.appendChild(headElement.cloneNode(true))

    const auxBodyElement = document.createElement('div')
    auxBodyElement.classList.add('body')

    rowElements.forEach(item =>
      auxBodyElement.appendChild(item.cloneNode(true)),
    )

    auxTableElement.appendChild(auxBodyElement)

    if (i === trGroups.length - 1)
      auxTableElement.appendChild(footElement.cloneNode(true))

    const containerToHideElement = document.createElement('div')

    Object.assign(containerToHideElement.style, {
      position: 'fixed',
      width: 0,
      overflow: 'auto',
    })

    containerToHideElement.appendChild(auxTableElement)

    document.body.appendChild(containerToHideElement)

    const imageUrl = await domtoimage.toPng(auxTableElement)

    document.body.removeChild(containerToHideElement)

    return imageUrl
  })

  // Genera cada imagen en paralelo
  return Promise.all(generators)
}
