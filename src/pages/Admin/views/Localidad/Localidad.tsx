import { View } from '../../components'
import { Add, Query } from './components'
import { ViewKey } from '../../enums'

const Localidad= () => {
  return <View view={ViewKey.LOCALIDAD} add={<Add />} query={<Query />} />
}

export default Localidad