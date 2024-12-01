import { View } from '../../components'
import { Add, Query } from './components'
import { ViewKey } from '../../constants'

const Departamentos = () => (
  <View viewKey={ViewKey.DEPARTAMENTOS} add={<Add />} query={<Query />} />
)

export default Departamentos
