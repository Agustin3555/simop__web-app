import {
  defineProps,
  buildMetaModel,
  createDateProp,
  createTextProp,
  createRefProp,
  createNumberProp,
} from '../../meta'
import { COMMON_PROPS } from '../../constants/commonProps.const'
import { Method } from '@/services/config'
import { omitBaseEntity } from '../../constants/selectors.const'
import { FojaMedicionService } from './fojaMedicion.service'
import { FojaMedicionModel } from '.'
import { AreaMeta } from '../area/area.meta'
import { InspectorMeta } from '../inspector/inspector.meta'
import { ObraMeta } from '../obra/obra.meta'

const { props, allFields } = defineProps<FojaMedicionModel.Entity>({
  obra: createRefProp({
    getMetaModel: () => ObraMeta,
    config: {
      field: {
        required: true,
      },
    },
  }),
  numeroExpediente: createTextProp({
    title: 'Numero de Expediente de Foja',
    config: {
      field: {
        required: true,
      },
    },
  }),
  numero: createNumberProp({
    title: 'Número de foja',
    config: {
      field: {
        required: true,
      },
    },
  }),
  avance: createNumberProp({
    title: 'Porcentaje de avance',
    config: {
      sub: '%',
      isDecimal: true,
    },
  }),
  fechaFoja: createDateProp({
    title: 'Fecha de Solicitud',
  }),
  fechaCertificacion: createDateProp({
    title: 'Fecha Certificación',
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
  inspector: createRefProp({
    getMetaModel: () => InspectorMeta,
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

export const FojaMedicionMeta = buildMetaModel(
  {
    key: 'fojaMedicion',
    service: FojaMedicionService,
    refreshRate: 'medium',
    title: {
      singular: 'Foja de Medición',
      plural: 'Fojas de Mediciones',
    },
    faIcon: 'fa-solid fa-clipboard-list',
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
