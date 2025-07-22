import { defineProps, buildMetaModel } from '../../meta'
import { TIPO_PROPS } from '../../constants/commonProps.const'
import { Method } from '@/services/config'
import { omitBaseEntity } from '../../constants/selectors.const'
import { TipoParalizacionService } from './tipoParalizacion.service'
import { TipoParalizacionModel } from '.'

const { props, allFields } =
  defineProps<TipoParalizacionModel.Entity>(TIPO_PROPS)

export const TipoParalizacionMeta = buildMetaModel(
  {
    key: 'tipoParalizacion',
    service: TipoParalizacionService,
    title: {
      singular: 'Tipo de Paralización',
      plural: 'Tipos de Paralización',
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
