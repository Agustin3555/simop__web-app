import { defineProps, buildMetaModel } from '../../meta'
import { TIPO_PROPS } from '../../constants/commonProps.const'
import { Method } from '@/services/config'
import { omitBaseEntity } from '../../constants/selectors.const'
import { TipoRescisionService } from './tipoRescision.service'
import { TipoRescisionModel } from '.'

const { props, allFields } = defineProps<TipoRescisionModel.Entity>(TIPO_PROPS)

export const TipoRescisionMeta = buildMetaModel(
  {
    key: 'tipoRescision',
    service: TipoRescisionService,
    title: {
      singular: 'Rescisión',
      plural: 'Tipos de Rescisión',
    },
    faIcon: 'fa-solid fa-shapes',
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
