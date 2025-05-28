import './StylizedNumber.css'
import { NumberProp } from '../../meta'

interface StylizedNumberProps
  extends Pick<NonNullable<NumberProp['config']>, 'isMoney' | 'pre' | 'sub'> {
  value: number
}

const StylizedNumber = ({ value, isMoney, pre, sub }: StylizedNumberProps) => (
  <p className="cmp-stylized-number">
    {pre && <small className="pre">{pre}</small>}
    {isMoney
      ? value.toLocaleString('es-ES', {
          minimumFractionDigits: 2,
        })
      : value}
    {sub && <small className="sub">{sub}</small>}
  </p>
)

export default StylizedNumber
