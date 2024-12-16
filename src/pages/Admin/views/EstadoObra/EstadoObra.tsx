import { View } from '../../components'
import { Add, Query } from './components'
import { ViewKey } from '../../constants'

const EstadoObra = () => {
  return (
    <View viewKey={ViewKey.TIPO_ESTADO_OBRA} add={<Add />} query={<Query />} />
  )
}

export default EstadoObra
