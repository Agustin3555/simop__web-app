import { defineProps, buildMetaModel } from '../../meta'
import { TIPO_PROPS } from '../../constants/commonProps.const'
import { Method } from '@/services/config'
import { omitBaseEntity } from '../../constants/selectors.const'
import { TipoEstadoObraService } from './tipoEstadoObra.service'
import { TipoEstadoObraModel } from '.'

const { props, allFields } = defineProps<TipoEstadoObraModel.Entity>(TIPO_PROPS)

export const TipoEstadoObraMeta = buildMetaModel(
  {
    key: 'tipoEstadoObra',
    service: TipoEstadoObraService,
    title: {
      singular: 'Estado',
      plural: 'Tipos de Estados de Obra',
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
