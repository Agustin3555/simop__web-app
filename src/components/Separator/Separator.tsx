import './Separator.css'
import { clsx } from '@/helpers'

interface Props {
  asSpan?: boolean
  invert?: boolean
}

const Separator = ({ asSpan = false, invert = false }: Props) => {
  const className = clsx('cmp-separator', { invert })

  return asSpan ? <span {...{ className }} /> : <hr {...{ className }} />
}

export default Separator
