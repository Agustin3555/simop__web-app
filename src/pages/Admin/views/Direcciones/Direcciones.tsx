import { View } from '../../components'
import { Add } from './components'
import { ViewKey } from '../../enums'

const Direcciones = () => {
  return <View view={ViewKey.DIRECCIONES} add={<Add />} />
}

export default Direcciones
