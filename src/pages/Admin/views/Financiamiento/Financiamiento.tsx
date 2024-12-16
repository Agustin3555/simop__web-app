import { View } from '../../components'
import { Add, Query } from './components'
import { ViewKey } from '../../constants'

const Financiamiento = () => {
  return (
    <View
      viewKey={ViewKey.TIPO_FINANCIAMIENTO_OBRA}
      add={<Add />}
      query={<Query />}
    />
  )
}

export default Financiamiento
