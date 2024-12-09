import { View } from '../../components'
import { Add, Query } from './components'
import { ViewKey } from '../../constants'

const Financiamiento = () => {
  return (
    <View viewKey={ViewKey.FINANCIAMIENTO} add={<Add />} query={<Query />} />
  )
}

export default Financiamiento 
