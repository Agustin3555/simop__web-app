import { View } from '../../components'
import { Add, Query } from './components'
import { ViewKey } from '../../constants'

const Localidad = () => {
  return <View viewKey={ViewKey.LOCALIDAD} add={<Add />} query={<Query />} />
}

export default Localidad
