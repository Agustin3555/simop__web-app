import './FetchRef.css'
import { Button } from '@/components'
import { GetOneProvider, Ref } from '@/services/config'

interface FetchRefProps extends GetOneProvider, Ref {
  title: string
}

const FetchRef = ({ id, title, getOne }: FetchRefProps) => {
  return (
    <div className="cmp-fetch-ref">
      <Button
        text={title}
        title={`Ver más de '${title}'`}
        faIcon="fa-solid fa-cube"
        _type="secondary"
        inverted
      />
      {/* <dialog>
      {data ? <Loader /> : }
      </dialog> */}
    </div>
  )
}

export default FetchRef
