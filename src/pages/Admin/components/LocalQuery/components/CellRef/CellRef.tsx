import './CellRef.css'
import { Icon } from '@/components'

interface CellRefProps {
  value: string
  field: string
  provider: () => Promise<unknown>
}

const CellRef = ({ value, field, provider }: CellRefProps) => {
  return (
    <div className="cmp-cell-ref">
      <small>{field}</small>
      <p>{value}</p>
      {/* <button>
        <p>{value}</p>
        <Icon faIcon="fa-solid fa-angle-right" />
      </button> */}
    </div>
  )
}

export default CellRef
