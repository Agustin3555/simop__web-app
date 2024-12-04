import { View } from '../../components'
import { Add, Query } from './components'
import { ViewKey } from '../../enums'

const Inspector = () => {
  return <View view={ViewKey.INSPECTOR} add={<Add />} query={<Query />} />
}

export default Inspector
