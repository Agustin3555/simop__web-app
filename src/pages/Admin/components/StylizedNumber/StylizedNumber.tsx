import './StylizedNumber.css'
import { NumberProp } from '../../meta/number'

interface StylizedNumberProps
  extends Pick<NonNullable<NumberProp['config']>, 'isMoney' | 'pre' | 'sub'> {
  value: number | string
}

const StylizedNumber = ({ value, isMoney, pre, sub }: StylizedNumberProps) => {
  const displayValue = isMoney
    ? new Intl.NumberFormat('es-ES', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 6,
      }).format(Number(value))
    : value

  return (
    <p className="cmp-stylized-number">
      {pre && <small className="pre">{pre}</small>}
      {displayValue}
      {sub && <small className="sub">{sub}</small>}
    </p>
  )
}

export default StylizedNumber
