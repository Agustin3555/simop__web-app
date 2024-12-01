import { View } from '../../components'
import { Add, Query } from './components'
import { ViewKey } from '../../enums'

const Departamentos = () => (
  <View
    title="Departamentos"
    view={ViewKey.DEPARTAMENTOS}
    add={<Add />}
    query={<Query />}
  />
)

export default Departamentos
