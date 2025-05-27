import { MetaModel, TextProp } from '../../services/config'
import { COMMON_PROPS } from '../../constants/commonProps.const'
import { Method } from '@/services/config'
import { omitBaseEntity } from '../../constants/selectors.const'
import { PaisService } from './pais.service'
import { PaisModel } from '.'

export const PaisMeta = new MetaModel<PaisModel.Entity>({
  key: 'pais',
  service: PaisService,
  title: {
    singular: 'País',
    plural: 'Países',
  },
  faIcon: 'fa-solid fa-earth-americas',

  anchorField: 'nombre',
  props: {
    nombre: new TextProp('Nombre', {
      field: {
        required: true,
      },
    }),
    ...COMMON_PROPS,
  },
})

PaisMeta.fieldsByService = [
  {
    methods: [Method.GetAll, Method.GetOne],
    fields: PaisMeta.allFields,
  },
  {
    methods: [Method.Create, Method.UpdateOne],
    groups: [{ key: '', fields: omitBaseEntity(PaisMeta.allFields) }],
  },
]
