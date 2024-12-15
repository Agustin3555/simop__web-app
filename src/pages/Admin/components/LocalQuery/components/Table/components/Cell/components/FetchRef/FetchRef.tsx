import './FetchRef.css'
import { Button } from '@/components'
import { GetOneProvider } from '@/types'

interface FetchRefProps extends GetOneProvider<any> {
  id: number
  value: string
}

const FetchRef = ({ id, value, getOneProvider }: FetchRefProps) => {
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
