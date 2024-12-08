import { View } from '../../components'
import { Add, Query } from './components'
import { ViewKey } from '../../constants'

const TipoProfesion = () => (
  <View viewKey={ViewKey.TIPO_PROFESION} add={<Add />} query={<Query />} />
)

export default TipoProfesion
