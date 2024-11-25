import { View } from '../../components'
import { Add, Query } from './components'
import { ViewKey } from '../../enums'

const Departamentos = () => {
  return <View view={ViewKey.DEPARTAMENTOS} add={<Add />} query={<Query />} />
}

export default Departamentos
