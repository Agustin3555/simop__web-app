import { View } from '../../components'
import { Add, Query } from './components'
import { ViewKey } from '../../constants'

const Direcciones = () => (
  <View viewKey={ViewKey.DIRECCION} add={<Add />} query={<Query />} />
)

export default Direcciones
