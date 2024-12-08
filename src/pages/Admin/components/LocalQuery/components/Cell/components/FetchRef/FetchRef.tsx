import './FetchRef.css'
import { Button } from '@/components'

interface FetchRefProps {
  id: number
  value: string
  provider: (id: number) => Promise<unknown>
}

const FetchRef = ({ id, value, provider }: FetchRefProps) => {
  return (
    <div className="cmp-fetch-ref">
      <Button title={value} faIcon="fa-solid fa-eye" _type="secondary" />
      {/* <dialog>
      {data ? <Loader /> : }
      </dialog> */}
    </div>
  )
}

export default FetchRef
