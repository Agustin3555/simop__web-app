import './CellRef.css'
import { useHandleAction } from '@/hooks'
import { Button } from '@/components'

export type Provider = (id: number) => Promise<any>

interface CellRefProps {
  value: number | string
  provider: Provider
}

const CellRef = ({ value, provider }: CellRefProps) => {
  const handleActionResult = useHandleAction(({ setError, setSuccess }) => {})

  return (
    <div className="cmp-cell-ref">
      <Button title={value} faIcon="fa-solid fa-eye"></Button>
    </div>
  )
}

export default CellRef
