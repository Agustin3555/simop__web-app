import { defineProps, buildMetaModel } from '../../meta'
import { TIPO_PROPS } from '../../constants/commonProps.const'
import { Method } from '@/services/config'
import { omitBaseEntity } from '../../constants/selectors.const'
import { TipoProgramaObraService } from './tipoProgramaObra.service'
import { TipoProgramaObraModel } from '.'

const { props, allFields } =
  defineProps<TipoProgramaObraModel.Entity>(TIPO_PROPS)

export const TipoProgramaObraMeta = buildMetaModel(
  {
    key: 'tipoProgramaObra',
    service: TipoProgramaObraService,
    title: {
      singular: 'Programa de Obra',
      plural: 'Programas de Obra',
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
