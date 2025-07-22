import { defineProps, buildMetaModel } from '../../meta'
import { TIPO_PROPS } from '../../constants/commonProps.const'
import { Method } from '@/services/config'
import { omitBaseEntity } from '../../constants/selectors.const'
import { TipoTematicaObraService } from './tipoTematicaObra.service'
import { TipoTematicaObraModel } from '.'

const { props, allFields } =
  defineProps<TipoTematicaObraModel.Entity>(TIPO_PROPS)

export const TipoTematicaObraMeta = buildMetaModel(
  {
    key: 'tipoTematicaObra',
    service: TipoTematicaObraService,
    title: {
      singular: 'Temática de Obra',
      plural: 'Temáticas de Obra',
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
