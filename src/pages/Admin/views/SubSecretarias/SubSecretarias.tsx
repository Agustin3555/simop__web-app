import { View } from '../../components'
import { ViewKey } from '../../enums'
import { Add } from './components'

const SubSecretarias = () => {
  return (
    <View
      view={ViewKey.SUB_SECRETARIAS}
      items={[
        { title: 'Agregar', faIcon: 'fa-solid fa-plus' },
        { title: 'Modificar', faIcon: 'fa-solid fa-pen-to-square' },
      ]}
    >
      <Add />
      <Add />
    </View>
  )
}

export default SubSecretarias
