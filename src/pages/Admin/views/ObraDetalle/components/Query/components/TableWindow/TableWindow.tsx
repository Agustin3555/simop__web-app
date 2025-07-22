import './TableWindow.css'
import { LooseEntity } from '@/models/config'
import { Table } from '@/pages/Admin/components'
import { MetaModelContext, TableProvider } from '@/pages/Admin/contexts'
import { MetaModel } from '@/pages/Admin/meta'

export interface TableWindowProps {
  metaModel: MetaModel
  data: LooseEntity[]
}

const TableWindow = ({ metaModel, data }: TableWindowProps) => (
  <div className="cmp-table-window">
    <h1>{metaModel.title.plural}</h1>
    <MetaModelContext.Provider value={metaModel}>
      <TableProvider>
        <Table {...{ data }} />
      </TableProvider>
    </MetaModelContext.Provider>
  </div>
)

export default TableWindow
