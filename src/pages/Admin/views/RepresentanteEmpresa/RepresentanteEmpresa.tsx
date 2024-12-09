import { View } from '../../components'
import { Add, Query } from './components'
import { ViewKey } from '../../constants'

const RepresentanteEmpresa = () => {
  return <View viewKey={ViewKey.REPRESENTANTE_EMPRESA} add={<Add />} query={<Query />} />
}

export default RepresentanteEmpresa
