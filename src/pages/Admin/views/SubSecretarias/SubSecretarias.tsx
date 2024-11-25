import { View } from '../../components'
import { Add, Query } from './components'
import { ViewKey } from '../../enums'

const SubSecretarias = () => {
  return <View view={ViewKey.SUB_SECRETARIAS} add={<Add />} query={<Query />} />
}

export default SubSecretarias
