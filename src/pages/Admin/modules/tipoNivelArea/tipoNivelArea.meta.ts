import { defineProps, buildMetaModel } from '../../meta'
import { TIPO_PROPS } from '../../constants/commonProps.const'
import { Method } from '@/services/config'
import { omitBaseEntity } from '../../constants/selectors.const'
import { TipoNivelAreaService } from './tipoNivelArea.service'
import { TipoNivelAreaModel } from '.'

const { props, allFields } = defineProps<TipoNivelAreaModel.Entity>(TIPO_PROPS)

export const TipoNivelAreaMeta = buildMetaModel(
  {
    key: 'tipoNivelArea',
    service: TipoNivelAreaService,
    title: {
      singular: 'Tipo de Nivel de Área',
      plural: 'Tipos de Niveles de Área',
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
