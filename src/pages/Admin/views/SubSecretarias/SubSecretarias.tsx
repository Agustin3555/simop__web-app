import { View } from '../../components'
import { Add, Query } from './components'
import { ViewKey } from '../../constants'

const SubSecretarias = () => (
  <View viewKey={ViewKey.SUB_SECRETARIAS} add={<Add />} query={<Query />} />
)

export default SubSecretarias
