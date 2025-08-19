import domtoimage from 'dom-to-image'

const SCALE = 1

export const captureElementImage = async (element: HTMLElement) =>
  await domtoimage.toPng(element, {
    height: element.offsetHeight * SCALE,
    width: element.offsetWidth * SCALE,
    style: {
      transform: `scale(${SCALE})`,
      transformOrigin: 'top left',
    },
  })
