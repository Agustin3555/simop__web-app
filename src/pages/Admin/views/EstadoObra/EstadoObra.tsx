import { View } from '../../components'
import { Add, Query } from './components'
import { ViewKey } from '../../enums'

const EstadoObra = () => {
  return <View view={ViewKey.ESTADO_OBRA} add={<Add />} query={<Query />} />
}

export default EstadoObra
