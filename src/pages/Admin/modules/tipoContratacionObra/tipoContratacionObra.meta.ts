import { defineProps, buildMetaModel } from '../../meta'
import { TIPO_PROPS } from '../../constants/commonProps.const'
import { Method } from '@/services/config'
import { omitBaseEntity } from '../../constants/selectors.const'
import { TipoContratacionObraService } from './tipoContratacionObra.service'
import { TipoContratacionObraModel } from '.'

const { props, allFields } =
  defineProps<TipoContratacionObraModel.Entity>(TIPO_PROPS)

export const TipoContratacionObraMeta = buildMetaModel(
  {
    key: 'tipoContratacionObra',
    service: TipoContratacionObraService,
    title: {
      singular: 'Tipo de Contratación de Obra',
      plural: 'Tipos de Contrataciones de Obra',
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
