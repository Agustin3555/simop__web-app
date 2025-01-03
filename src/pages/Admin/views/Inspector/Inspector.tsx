import { View } from '../../components'
import { Add, Query } from './components'
import { ViewKey } from '../../constants'

const Inspector = () => (
  <View viewKey={ViewKey.INSPECTOR} add={<Add />} query={<Query />} />
)

export default Inspector
