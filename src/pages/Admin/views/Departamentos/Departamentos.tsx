import { View } from '../../components'
import { Add } from './components'
import { ViewKey } from '../../enums'

const Departamentos = () => {
  return <View view={ViewKey.DEPARTAMENTOS} add={<Add />} />
}

export default Departamentos
