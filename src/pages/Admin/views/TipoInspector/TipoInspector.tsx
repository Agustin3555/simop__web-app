import { View } from '../../components'
import { Add, Query } from './components'
import { ViewKey } from '../../constants'

const TipoInspector = () => {
  return (
    <View viewKey={ViewKey.TIPO_INSPECTOR} add={<Add />} query={<Query />} />
  )
}

export default TipoInspector
