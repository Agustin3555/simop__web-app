import { View } from '../../components'
import { Add, Query } from './components'
import { ViewKey } from '../../constants'

const Tramite = () => {
  return <View viewKey={ViewKey.TRAMITE} add={<Add />} query={<Query />} />
}

export default Tramite
