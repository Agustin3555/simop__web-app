import './TableWindow.css'
import { GeneralEntity } from '@/models/config'
import { Table } from '@/pages/Admin/components'
import { MetaModelContext } from '@/pages/Admin/contexts'
import { MetaModel } from '@/pages/Admin/meta'

export interface TableWindowProps {
  metaModel: MetaModel
  data: GeneralEntity[]
}

const TableWindow = ({ metaModel, data }: TableWindowProps) => (
  <div className="cmp-table-window">
    <h1>{metaModel.title.plural}</h1>
    <MetaModelContext.Provider value={{ metaModel }}>
      <Table {...{ data }} />
    </MetaModelContext.Provider>
  </div>
)

export default TableWindow
