import {
  defineProps,
  buildMetaModel,
  createDateProp,
  createTextProp,
  createRefProp,
} from '../../meta'
import { COMMON_PROPS } from '../../constants/commonProps.const'
import { Method } from '@/services/config'
import { omitBaseEntity } from '../../constants/selectors.const'
import { RescisionModel } from '.'
import { RescisionService } from './rescision.service'
import { AreaMeta } from '../area/area.meta'
import { ObraMeta } from '../obra/obra.meta'
import { TipoRescisionMeta } from '../tipoRescision/tipoRescision.meta'

const { props, allFields } = defineProps<RescisionModel.Entity>({
  obra: createRefProp({
    getMetaModel: () => ObraMeta,
    config: {
      field: {
        required: true,
      },
    },
  }),
  numeroExpediente: createTextProp({
    title: 'Número De Expediente',
    config: {
      field: {
        required: true,
      },
    },
  }),
  numeroResolucion: createTextProp({
    title: 'Número De Resolución',
  }),
  fecha: createDateProp({
    title: 'Fecha',
  }),
  tipoRescision: createRefProp({
    getMetaModel: () => TipoRescisionMeta,
  }),
  area: createRefProp({
    getMetaModel: () => AreaMeta,
  }),
  observaciones: createTextProp({
    title: 'Observaciones',
    config: {
      isLong: true,
    },
  }),
  ...COMMON_PROPS,
})

export const RescisionMeta = buildMetaModel(
  {
    key: 'rescision',
    service: RescisionService,
    refreshRate: 'medium',
    title: {
      singular: 'Rescision',
      plural: 'Rescisiones',
    },
    faIcon: 'fa-solid fa-ban',
    anchorField: 'numeroExpediente',
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
