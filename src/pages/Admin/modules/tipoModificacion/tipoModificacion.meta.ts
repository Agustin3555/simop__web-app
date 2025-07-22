import { defineProps, buildMetaModel } from '../../meta'
import { TIPO_PROPS } from '../../constants/commonProps.const'
import { Method } from '@/services/config'
import { omitBaseEntity } from '../../constants/selectors.const'
import { TipoModificacionService } from './tipoModificacion.service'
import { TipoModificacionModel } from '.'

const { props, allFields } =
  defineProps<TipoModificacionModel.Entity>(TIPO_PROPS)

export const TipoModificacionMeta = buildMetaModel(
  {
    key: 'tipoModificacion',
    service: TipoModificacionService,
    title: {
      singular: 'Tipo de Modificación',
      plural: 'Tipos de Modificaciones',
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
