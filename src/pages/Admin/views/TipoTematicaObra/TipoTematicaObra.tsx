import { View } from '../../components'
import { Add, Query } from './components'
import { ViewKey } from '../../constants'

const TipoTematicaObra = () => (
  <View viewKey={ViewKey.TIPO_TEMATICA_OBRA} add={<Add />} query={<Query />} />
)

export default TipoTematicaObra
