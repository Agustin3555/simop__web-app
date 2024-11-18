import { View } from '../../components'
import { Input } from '@/components'
import { ViewKey } from '../../enums'

const Direcciones = () => {
  return (
    <View
      view={ViewKey.DIRECCIONES}
      items={[
        { title: 'Agregar', faIcon: 'fa-solid fa-plus' },
        { title: 'Modificar', faIcon: 'fa-solid fa-pen-to-square' },
      ]}
    >
      <Input />
      <Input />
    </View>
  )
}

export default Direcciones
