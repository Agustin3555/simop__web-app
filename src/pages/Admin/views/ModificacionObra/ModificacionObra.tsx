import { View } from '../../components'
import { Add, Query } from './components'
import { ViewKey } from '../../constants'

const ModificacionObra = () => {
  return <View viewKey={ViewKey.MODIFICACION_OBRA} add={<Add />} query={<Query />} />
}

export default ModificacionObra
