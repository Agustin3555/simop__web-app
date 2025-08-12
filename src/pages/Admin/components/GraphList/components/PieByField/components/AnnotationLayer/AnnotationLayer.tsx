import './AnnotationLayer.css'
import { PieData } from '../../PieByField'
import { palColor, palColorGS } from '@/styles/palette'

export interface PieSectorData {
  cx: number
  cy: number
  midAngle: number
  outerRadius: number
  shortenedTitle?: string
  hidden: boolean
  percent: number
  payload: PieData
}

const RADIAN = Math.PI / 180
const MIN_OFFSET = 10
const MAX_OFFSET = 30

const getAnnotationCoordinates = (
  { midAngle, outerRadius, shortenedTitle, payload }: PieSectorData,
  { width, height }: AnnotationLayerProps['dimensions'],
) => {
  const { title: fullTitle } = payload

  const sin = Math.sin(-RADIAN * midAngle)
  const cos = Math.cos(-RADIAN * midAngle)

  const offset = MIN_OFFSET + (MAX_OFFSET - MIN_OFFSET) * (1 - Math.abs(cos))

  const cx = width / 2
  const cy = height / 2

  const sx = cx + (outerRadius + 10) * cos
  const sy = cy + (outerRadius + 10) * sin
  const mx = cx + (outerRadius + 30) * cos
  const my = cy + (outerRadius + 30) * sin
  const ex = mx + offset * Math.sign(cos)
  const ey = my

  const title = shortenedTitle ?? fullTitle
  const textAnchor = cos >= 0 ? 'start' : 'end'

  return { cos, sx, sy, mx, my, ex, ey, title, textAnchor }
}

interface AnnotationLayerProps {
  data: PieSectorData[]
  activeIndex?: number
  dimensions: {
    width: number
    height: number
  }
}

const AnnotationLayer = ({
  data,
  activeIndex,
  dimensions,
}: AnnotationLayerProps) =>
  data.map((d, i) => {
    const { hidden, percent, payload } = d
    const { color, amount } = payload
    const { cos, sx, sy, mx, my, ex, ey, title, textAnchor } =
      getAnnotationCoordinates(d, dimensions)

    return (
      <g key={i} opacity={activeIndex === i ? 1 : hidden ? 0 : 1}>
        <path
          d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
          fill="none"
          stroke={palColorGS('400')}
        />
        <circle
          cx={ex}
          cy={ey}
          r={3}
          fill={color}
          strokeWidth={1}
          stroke={palColorGS('white')}
        />
        <text
          fontSize={11}
          x={ex + (cos >= 0 ? 1 : -1) * 12}
          y={ey - 4}
          {...{ textAnchor }}
        >
          {title}
        </text>
        <text
          fontSize={11}
          x={ex + (cos >= 0 ? 1 : -1) * 12}
          y={ey - 4}
          dy={16}
          fill={palColor('A')}
          {...{ textAnchor }}
        >
          {cos >= 0 ? `${percent}% (${amount})` : `(${amount}) ${percent}%`}
        </text>
      </g>
    )
  })

export default AnnotationLayer
