import { View } from '../../components'
import { Add, Query } from './components'
import { ViewKey } from '../../constants'

const ParalizacionObra = () => {
  return <View viewKey={ViewKey.PARALIZACION_OBRA} add={<Add />} query={<Query />} />
}

export default ParalizacionObra
