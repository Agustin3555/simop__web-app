import { View } from '../../components'
import { Add, Query } from './components'
import { ViewKey } from '../../constants'

const Certificacion = () => (
  <View viewKey={ViewKey.CERTIFICACION} add={<Add />} query={<Query />} />
)

export default Certificacion
