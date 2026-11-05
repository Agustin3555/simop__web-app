import './Loader.css'
import { clsx } from '@/helpers'

export interface Props {
  handlingClass?: string
}

const Loader = ({ handlingClass }: Props) => (
  <span className={clsx('cmp-loader', handlingClass)} />
)

export default Loader
