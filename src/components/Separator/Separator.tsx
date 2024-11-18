import './Separator.css'
import { classList } from '@/helpers'

interface Props {
  asSpan?: boolean
  invert?: boolean
}

const Separator = ({ asSpan = false, invert = false }: Props) => {
  const className = classList('cmp-separator', { invert })

  return asSpan ? <span {...{ className }} /> : <hr {...{ className }} />
}

export default Separator
