import { View } from '../../components'
import { Add, Query } from './components'
import { ViewKey } from '../../constants'

const Empresa = () => (
  <View viewKey={ViewKey.EMPRESA} add={<Add />} query={<Query />} />
)

export default Empresa
