import './FetchRef.css'
import { Button } from '@/components'
import { GetOneProvider, Ref } from '@/services/config'

interface FetchRefProps extends GetOneProvider, Ref {
  title: string
}

const FetchRef = ({ id, title, getOne }: FetchRefProps) => {
  return (
    <div className="cmp-fetch-ref">
      <Button text={String(title)} faIcon="fa-solid fa-eye" _type="secondary" />
      {/* <dialog>
      {data ? <Loader /> : }
      </dialog> */}
    </div>
  )
}

export default FetchRef
