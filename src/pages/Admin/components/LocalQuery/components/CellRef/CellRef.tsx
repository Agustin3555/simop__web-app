import './CellRef.css'
import { Icon } from '@/components'

export interface CellRefProps {
  value: number | string
  provider: (id: number) => Promise<unknown>
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
