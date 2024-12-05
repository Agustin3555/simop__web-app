import { View } from '../../components'
import { Add, Query } from './components'
import { ViewKey } from '../../enums'

const Provincia= () => {
  return <View view={ViewKey.PROVINCIA} add={<Add />} query={<Query />} />
}

export default Provincia
