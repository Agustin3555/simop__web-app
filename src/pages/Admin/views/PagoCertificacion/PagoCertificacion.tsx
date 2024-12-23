import { View } from '../../components'
import { Add, Query } from './components'
import { ViewKey } from '../../constants'

const PagoCertificacion = () => (
  <View viewKey={ViewKey.PAGO_CERTIFICACION} add={<Add />} query={<Query />} />
)

export default PagoCertificacion
