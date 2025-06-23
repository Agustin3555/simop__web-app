import { COMMON_PROPS } from '../../constants/commonProps.const'
import {
  MetaModel,
  NumberProp,
  RefProp,
  DateProp,
  TextLongProp,
  TextProp,
} from '../../meta'
import { Method } from '@/services/config'
import { omitBaseEntity } from '../../constants/selectors.const'
import { PagoCertificacionService } from './pagoCertificacion.service'
import { PagoCertificacionModel } from '.'
import { AreaMeta } from '../area/area.meta'
import { FojaMedicionMeta } from '../fojaMedicion/fojaMedicion.meta'
import { RedeterminacionMeta } from '../redeterminacion/redeterminacion.meta'

export const PagoCertificacionMeta =
  new MetaModel<PagoCertificacionModel.Entity>({
    key: 'pagoCertificacion',
    service: PagoCertificacionService,
    refreshRate: 'medium',
    title: {
      singular: 'Pago de Certificación',
      plural: 'Pagos de Certificación',
    },
    faIcon: 'fa-solid fa-file-invoice-dollar',

    anchorField: 'numero',
    props: {
      numero: new NumberProp('Número de Pago', {
        field: {
          required: true,
        },
      }),
      ordenPago: new TextProp('Orden de pago', {
        field: {
          required: true,
        },
      }),
      fecha: new DateProp('Fecha de Pago'),
      monto: new NumberProp('Monto orden de pago', {
        decimal: true,
        isMoney: true,
        big: true,
        sum: true,
        pre: '$',
      }),
      fojaMedicion: new RefProp({
        getMetaModel: () => FojaMedicionMeta,
      }),
      redeterminacion: new RefProp({
        getMetaModel: () => RedeterminacionMeta,
      }),
      area: new RefProp({
        getMetaModel: () => AreaMeta,
      }),
      observaciones: new TextLongProp('Observaciones'),
      ...COMMON_PROPS,
    },
  })

PagoCertificacionMeta.fieldsByService = [
  {
    methods: [Method.GetAll, Method.GetOne],
    fields: PagoCertificacionMeta.allFields,
  },
  {
    methods: [Method.Create, Method.UpdateOne],
    groups: [
      { key: '', fields: omitBaseEntity(PagoCertificacionMeta.allFields) },
    ],
  },
]
