import { View } from '../../components'
import { EmpresaModel, PaisModel } from '../../models'
import AutoCombobox from '../../components/AutoCombobox2/AutoCombobox'
import Combobox from '../../components/Combobox2/Combobox'

const Pais = () => (
  <View
    scheme={PaisModel.scheme}
    custom={[
      {
        localViewKey: 'test',
        title: 'Test',
        faIcon: '',
        component: (
          <div>
            <AutoCombobox
              keyName="test1"
              title="Test"
              scheme={EmpresaModel.scheme}
              multiple
            />
            <Combobox
              keyName="test2"
              title="Test"
              options={[
                { id: '1', title: 'A' },
                { id: '2', title: 'B' },
              ]}
              multiple
            />
          </div>
        ),
      },
    ]}
  />
)

export default Pais
