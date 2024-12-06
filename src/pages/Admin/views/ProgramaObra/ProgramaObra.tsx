import { View } from '../../components'
import { Add, Query } from './components'
import { ViewKey } from '../../constants'

const Inspector = () => {
  return <View viewKey={ViewKey.PROGRAMA_OBRA} add={<Add />} query={<Query />} />
}

export default Inspector
