import { View } from '../../components'
import { Add, Query } from './components'
import { ViewKey } from '../../constants'

const SubSecretaria = () => (
  <View viewKey={ViewKey.SUB_SECRETARIA} add={<Add />} query={<Query />} />
)

export default SubSecretaria
