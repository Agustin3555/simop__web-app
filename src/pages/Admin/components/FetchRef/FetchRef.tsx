import './FetchRef.css'
import { Button } from '@/components'
import { GetOneProvider } from '@/services/config'
import { Ref } from '@/types'

interface FetchRefProps extends GetOneProvider, Ref {}

const FetchRef = ({ id, title, getOne }: FetchRefProps) => {
  return (
    <div className="cmp-fetch-ref">
      <Button {...{ title }} faIcon="fa-solid fa-eye" _type="secondary" />
      {/* <dialog>
      {data ? <Loader /> : }
      </dialog> */}
    </div>
  )
}

export default FetchRef
