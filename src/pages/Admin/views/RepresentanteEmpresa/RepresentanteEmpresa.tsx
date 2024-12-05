import { View } from '../../components'
import { Add, Query } from './components'
import { ViewKey } from '../../enums'

const Pais = () => {
  return <View view={ViewKey.REPRESENTANTE_EMPRESA} add={<Add />} query={<Query />} />
}

export default Pais
