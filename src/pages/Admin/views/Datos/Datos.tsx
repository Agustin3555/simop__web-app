import { View } from '../../components'
import { Add, Query } from './components'
import { ViewKey } from '../../constants'

const Datos = () => (
  <View viewKey={ViewKey.DATOS} add={<Add />} query={<Query />} />
)

export default Datos