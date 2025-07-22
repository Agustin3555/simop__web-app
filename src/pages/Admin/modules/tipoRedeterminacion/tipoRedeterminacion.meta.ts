import { defineProps, buildMetaModel } from '../../meta'
import { TIPO_PROPS } from '../../constants/commonProps.const'
import { Method } from '@/services/config'
import { omitBaseEntity } from '../../constants/selectors.const'
import { TipoRedeterminacionService } from './tipoRedeterminacion.service'
import { TipoRedeterminacionModel } from '.'

const { props, allFields } =
  defineProps<TipoRedeterminacionModel.Entity>(TIPO_PROPS)

export const TipoRedeterminacionMeta = buildMetaModel(
  {
    key: 'tipoRedeterminacion',
    service: TipoRedeterminacionService,
    title: {
      singular: 'Redeterminación',
      plural: 'Tipos de Redeterminación',
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
