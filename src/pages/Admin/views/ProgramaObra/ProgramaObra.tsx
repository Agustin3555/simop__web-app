import { View } from '../../components'
import { Add, Query } from './components'
import { ViewKey } from '../../constants'

const ProgramaObra = () => {
  return (
    <View
      viewKey={ViewKey.TIPO_PROGRAMA_OBRA}
      add={<Add />}
      query={<Query />}
    />
  )
}

export default ProgramaObra
