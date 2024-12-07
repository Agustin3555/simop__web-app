import { View } from '../../components'
import { Add, Query } from './components'
import { ViewKey } from '../../constants'

const TipoInspector = () => (
  <View viewKey={ViewKey.TIPO_INSPECTOR} add={<Add />} query={<Query />} />
)

export default TipoInspector
