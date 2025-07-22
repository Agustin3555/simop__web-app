import { steppedSizes } from '../../helpers'
import { Column, HeaderContext } from '@tanstack/react-table'
import { LooseEntity } from '@/models/config'

interface Props {
  column: Column<LooseEntity, unknown>
  getContext: () => HeaderContext<LooseEntity, unknown>
}

const Footer = ({ column, getContext }: Props) => {
  const { columnDef, getSize } = column
  const { footer, minSize } = columnDef

  const width = steppedSizes(minSize!, getSize())

  return (
    <div className="cmp-cell" style={{ width }}>
      {footer && typeof footer === 'function' ? footer(getContext()) : footer}
    </div>
  )
}

export default Footer
