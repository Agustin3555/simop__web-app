import { View } from '../../components'
import { Add, Query } from './components'
import { ViewKey } from '../../constants'

const Obra = () => {
  return <View viewKey={ViewKey.OBRA} add={<Add />} query={<Query />} />
}

export default Obra
