import { View } from '../../components'
import { Add, Query } from './components'
import { ViewKey } from '../../enums'

const Pais = () => {
  return <View view={ViewKey.PAIS} add={<Add />} query={<Query />} />
}

export default Pais
