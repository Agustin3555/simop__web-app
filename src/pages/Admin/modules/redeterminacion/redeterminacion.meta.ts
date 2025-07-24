import {
  defineProps,
  buildMetaModel,
  createBooleanProp,
  createDateProp,
  createTextProp,
  createRefListProp,
  createRefProp,
  createNumberProp,
} from '../../meta'
import { COMMON_PROPS } from '../../constants/commonProps.const'
import { Method } from '@/services/config'
import { omitBaseEntity } from '../../constants/selectors.const'
import { RedeterminacionService } from './redeterminacion.service'
import { RedeterminacionModel } from '.'
import { AreaMeta } from '../area/area.meta'
import { ObraMeta } from '../obra/obra.meta'
import { TipoRedeterminacionMeta } from '../tipoRedeterminacion/tipoRedeterminacion.meta'

const { props, allFields } = defineProps<RedeterminacionModel.Entity>({
  obra: createRefProp({
    metaModelKey: () => ObraMeta,
    config: {
      field: {
        required: true,
      },
    },
  }),
  numeroExpedienteSolicitud: createTextProp({
    title: 'Número de Expediente de Solicitud',
    config: {
      field: {
        required: true,
      },
    },
  }),
  numeroExpediente: createTextProp({
    title: 'Número De Expediente de Redeterminación',
  }),
  numeroResolucion: createTextProp({
    title: 'Número De Resolución',
  }),
  montoTotal: createNumberProp({
    title: 'Monto Total',
    config: {
      pre: '$',
      isDecimal: true,
      isMoney: true,
      isBig: true,
      calculate: 'sum',
    },
  }),
  nuevoMontoObra: createNumberProp({
    title: 'Nuevo Monto',
    config: {
      pre: '$',
      isDecimal: true,
      isMoney: true,
      isBig: true,
      calculate: 'sum',
    },
  }),
  fechaRedeterminacion: createDateProp({
    title: 'Fecha de Solicitud',
  }),
  fechaCertificacion: createDateProp({
    title: 'Fecha Certificación',
  }),
  tieneHijas: createBooleanProp({
    title: 'AE Acum.',
  }),
  tipoRedeterminacion: createRefProp({
    metaModelKey: () => TipoRedeterminacionMeta,
  }),
  area: createRefProp({
    metaModelKey: () => AreaMeta,
  }),
  redeterminacionesHijas: createRefListProp({
    metaModelKey: () => RedeterminacionMeta,
  }),
  observaciones: createTextProp({
    title: 'Observaciones',
    config: {
      isLong: true,
    },
  }),
  ...COMMON_PROPS,
})

export const RedeterminacionMeta = buildMetaModel(
  {
    key: 'redeterminacion',
    service: RedeterminacionService,
    refreshRate: 'medium',
    title: {
      singular: 'Redeterminación',
      plural: 'Redeterminaciones',
    },
    faIcon: 'fa-solid fa-calculator',
    anchorField: 'numeroExpedienteSolicitud',
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
