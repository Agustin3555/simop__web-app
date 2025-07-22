import { defineProps, buildMetaModel } from '../../meta'
import { TIPO_PROPS } from '../../constants/commonProps.const'
import { Method } from '@/services/config'
import { omitBaseEntity } from '../../constants/selectors.const'
import { TipoInspectorService } from './tipoInspector.service'
import { TipoInspectorModel } from '.'

const { props, allFields } = defineProps<TipoInspectorModel.Entity>(TIPO_PROPS)

export const TipoInspectorMeta = buildMetaModel(
  {
    key: 'tipoInspector',
    service: TipoInspectorService,
    title: {
      singular: 'Tipo de Inspector',
      plural: 'Tipos de Inspectores',
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
