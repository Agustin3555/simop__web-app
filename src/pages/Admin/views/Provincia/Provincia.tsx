import { View } from '../../components'
import { Add, Query } from './components'
import { ViewKey } from '../../constants'

const Provincia = () => {
  return <View viewKey={ViewKey.PROVINCIA} add={<Add />} query={<Query />} />
}

export default Provincia
