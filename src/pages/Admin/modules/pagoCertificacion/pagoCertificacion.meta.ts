import { COMMON_PROPS } from '../../constants/commonProps.const'
import {
  defineProps,
  buildMetaModel,
  createDateProp,
  createTextProp,
  createRefProp,
  createNumberProp,
} from '../../meta'
import { Method } from '@/services/config'
import { omitBaseEntity } from '../../constants/selectors.const'
import { PagoCertificacionService } from './pagoCertificacion.service'
import { PagoCertificacionModel } from '.'
import { AreaMeta } from '../area/area.meta'
import { FojaMedicionMeta } from '../fojaMedicion/fojaMedicion.meta'
import { RedeterminacionMeta } from '../redeterminacion/redeterminacion.meta'

const { props, allFields } = defineProps<PagoCertificacionModel.Entity>({
  numero: createNumberProp({
    title: 'Número de Pago',
    config: {
      field: {
        required: true,
      },
    },
  }),
  ordenPago: createTextProp({
    title: 'Orden de pago',
    config: {
      field: {
        required: true,
      },
    },
  }),
  fecha: createDateProp({
    title: 'Fecha de Pago',
  }),
  monto: createNumberProp({
    title: 'Monto orden de pago',
    config: {
      pre: '$',
      isDecimal: true,
      isMoney: true,
      isBig: true,
      calculate: 'sum',
    },
  }),
  fojaMedicion: createRefProp({
    getMetaModel: () => FojaMedicionMeta,
  }),
  redeterminacion: createRefProp({
    getMetaModel: () => RedeterminacionMeta,
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

export const PagoCertificacionMeta = buildMetaModel(
  {
    key: 'pagoCertificacion',
    service: PagoCertificacionService,
    refreshRate: 'medium',
    title: {
      singular: 'Pago de Certificación',
      plural: 'Pagos de Certificación',
    },
    faIcon: 'fa-solid fa-file-invoice-dollar',
    anchorField: 'numero',
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
