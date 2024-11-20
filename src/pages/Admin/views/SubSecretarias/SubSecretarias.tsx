import { View } from '../../components'
import { Add } from './components'
import { ViewKey } from '../../enums'

const SubSecretarias = () => {
  return <View view={ViewKey.SUB_SECRETARIAS} add={<Add />} />
}

export default SubSecretarias
