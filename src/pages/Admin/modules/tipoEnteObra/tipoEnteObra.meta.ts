import { defineProps, buildMetaModel } from '../../meta'
import { TIPO_PROPS } from '../../constants/commonProps.const'
import { Method } from '@/services/config'
import { omitBaseEntity } from '../../constants/selectors.const'
import { TipoEnteObraService } from './tipoEnteObra.service'
import { TipoEnteObraModel } from '.'

const { props, allFields } = defineProps<TipoEnteObraModel.Entity>(TIPO_PROPS)

export const TipoEnteObraMeta = buildMetaModel(
  {
    key: 'tipoEnteObra',
    service: TipoEnteObraService,
    title: {
      singular: 'Tipo de Ente de Obra',
      plural: 'Tipos de Entes de Obra',
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
