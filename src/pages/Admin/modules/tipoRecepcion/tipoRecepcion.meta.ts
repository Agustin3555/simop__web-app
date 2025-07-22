import { defineProps, buildMetaModel } from '../../meta'
import { TIPO_PROPS } from '../../constants/commonProps.const'
import { Method } from '@/services/config'
import { omitBaseEntity } from '../../constants/selectors.const'
import { TipoRecepcionService } from './tipoRecepcion.service'
import { TipoRecepcionModel } from '.'

const { props, allFields } = defineProps<TipoRecepcionModel.Entity>(TIPO_PROPS)

export const TipoRecepcionMeta = buildMetaModel(
  {
    key: 'tipoRecepcion',
    service: TipoRecepcionService,
    title: {
      singular: 'Recepción',
      plural: 'Tipos de Recepción',
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
