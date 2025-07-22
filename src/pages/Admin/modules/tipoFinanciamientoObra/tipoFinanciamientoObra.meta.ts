import { defineProps, buildMetaModel } from '../../meta'
import { TIPO_PROPS } from '../../constants/commonProps.const'
import { Method } from '@/services/config'
import { omitBaseEntity } from '../../constants/selectors.const'
import { TipoFinanciamientoObraService } from './tipoFinanciamientoObra.service'
import { TipoFinanciamientoObraModel } from '.'

const { props, allFields } =
  defineProps<TipoFinanciamientoObraModel.Entity>(TIPO_PROPS)

export const TipoFinanciamientoObraMeta = buildMetaModel(
  {
    key: 'tipoFinanciamientoObra',
    service: TipoFinanciamientoObraService,
    title: {
      singular: 'Tipo de Financiamiento de Obra',
      plural: 'Tipos de Financiamientos de Obra',
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
