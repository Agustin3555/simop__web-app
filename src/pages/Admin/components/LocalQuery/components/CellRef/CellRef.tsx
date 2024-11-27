import './CellRef.css'
import { Button } from '@/components'

export type RefProvider = (id: number) => Promise<any>

interface CellRefProps {
  value: number | string
  provider: RefProvider
}

const CellRef = ({ value, provider }: CellRefProps) => {
  return (
    <div className="cmp-cell-ref">
      <Button title={String(value)} faIcon="fa-solid fa-eye" />
    </div>
  )
}

export default CellRef
