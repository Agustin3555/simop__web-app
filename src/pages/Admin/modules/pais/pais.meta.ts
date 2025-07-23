import { defineProps, buildMetaModel, createTextProp } from '../../meta'
import { COMMON_PROPS } from '../../constants/commonProps.const'
import { Method } from '@/services/config'
import { omitBaseEntity } from '../../constants/selectors.const'
import { PaisService } from './pais.service'
import { PaisModel } from '.'

const { props, allFields } = defineProps<PaisModel.Entity>({
  nombre: createTextProp({
    title: 'Nombre',
    config: {
      field: {
        required: true,
      },
    },
  }),
  ...COMMON_PROPS,
})

export const PaisMeta = buildMetaModel(
  {
    key: 'pais',
    service: PaisService,
    title: {
      singular: 'País',
      plural: 'Países',
    },
    faIcon: 'fa-solid fa-earth-americas',
    anchorField: 'nombre',
    props,
  },
  [
    {
      methods: [Method.GetAll, Method.GetOne],
      fields: allFields,
    },
    {
      methods: [Method.Create, Method.UpdateOne],
      groups: [{ fields: omitBaseEntity(allFields) }],
    },
  ],
)
