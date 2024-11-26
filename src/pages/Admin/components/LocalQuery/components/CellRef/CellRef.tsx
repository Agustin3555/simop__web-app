import './CellRef.css'
import { Icon } from '@/components'

export type Provider = (id: number) => Promise<any>

interface CellRefProps {
  value: number | string
  provider: Provider
}

const CellRef = ({ value, provider }: CellRefProps) => {
  return (
    <button className="cmp-cell-ref">
      {value}
      {/* <button>
        <p>{value}</p>
        <Icon faIcon="fa-solid fa-angle-right" />
      </button> */}
    </button>
  )
}

export default CellRef
