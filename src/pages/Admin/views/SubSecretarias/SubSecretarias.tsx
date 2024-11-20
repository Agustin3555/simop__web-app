import { View } from '../../components'
import { Add } from './components'
import { ViewKey } from '../../enums'

const SubSecretarias = () => {
  return (
    <View
      view={ViewKey.SUB_SECRETARIAS}
      query={<Add />}
      add={<Add />}
      update={<Add />}
    />
  )
}

export default SubSecretarias
