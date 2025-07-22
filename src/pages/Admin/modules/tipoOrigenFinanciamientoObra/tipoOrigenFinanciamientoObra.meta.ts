import { defineProps, buildMetaModel } from '../../meta'
import { TIPO_PROPS } from '../../constants/commonProps.const'
import { Method } from '@/services/config'
import { omitBaseEntity } from '../../constants/selectors.const'
import { TipoOrigenFinanciamientoObraService } from './tipoOrigenFinanciamientoObra.service'
import { TipoOrigenFinanciamientoObraModel } from '.'

const { props, allFields } =
  defineProps<TipoOrigenFinanciamientoObraModel.Entity>(TIPO_PROPS)

export const TipoOrigenFinanciamientoObraMeta = buildMetaModel(
  {
    key: 'tipoOrigenFinanciamientoObra',
    service: TipoOrigenFinanciamientoObraService,
    title: {
      singular: 'Tipo de Origen de Financiamiento',
      plural: 'Tipos de Origen de Financiamiento',
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
