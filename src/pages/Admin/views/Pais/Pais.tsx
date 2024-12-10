import { View } from '../../components'
import { Add, Query } from './components'
import { ViewKey } from '../../constants'

const Pais = () => {
  return <View viewKey={ViewKey.PAIS} add={<Add />} query={<Query />} />
}

export default Pais
