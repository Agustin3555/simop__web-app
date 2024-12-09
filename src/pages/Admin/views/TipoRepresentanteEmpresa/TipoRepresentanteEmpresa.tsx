import { View } from '../../components'
import { Add, Query } from './components'
import { ViewKey } from '../../constants'

const TipoRepresentanteEmpresa = () => {
  return (
    <View viewKey={ViewKey.TIPO_REPRESENTANTE_EMPRESA} add={<Add />} query={<Query />} />
  )
}

export default TipoRepresentanteEmpresa
