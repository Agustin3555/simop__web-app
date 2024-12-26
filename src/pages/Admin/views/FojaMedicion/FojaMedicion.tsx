import { View } from '../../components'
import { Add, Query } from './components'
import { ViewKey } from '../../constants'

const FojaMedicion = () => (
  <View viewKey={ViewKey.FOJA_MEDICION} add={<Add />} query={<Query />} />
)

export default FojaMedicion
