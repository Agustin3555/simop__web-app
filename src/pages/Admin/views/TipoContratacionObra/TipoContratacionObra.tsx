import { View } from '../../components'
import { Add, Query } from './components'
import { ViewKey } from '../../constants'

const TipoContratacionObra = () => (
  <View
    viewKey={ViewKey.TIPO_CONTRATACION_OBRA}
    add={<Add />}
    query={<Query />}
  />
)

export default TipoContratacionObra
