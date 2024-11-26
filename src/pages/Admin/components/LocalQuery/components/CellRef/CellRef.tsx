import './CellRef.css'
import { Button } from '@/components'

export type Provider = (id: number) => Promise<any>

interface CellRefProps {
  value: number | string
  provider: Provider
}

const CellRef = ({ value, provider }: CellRefProps) => {
  return (
    <div className="cmp-cell-ref">
      <Button title={String(value)} faIcon="fa-solid fa-eye"></Button>
    </div>
  )
}

export default CellRef
