import { View } from '../../components'
import { Add, Query } from './components'
import { ViewKey } from '../../enums'

const Direcciones = () => (
  <View
    title="Direcciones"
    view={ViewKey.DIRECCIONES}
    add={<Add />}
    query={<Query />}
  />
)

export default Direcciones
