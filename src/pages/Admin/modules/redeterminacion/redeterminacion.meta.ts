import {
  DateProp,
  NumberProp,
  TextLongProp,
  RefProp,
  MetaModel,
  TextProp,
  BooleanProp,
  RefListProp,
} from '../../meta'
import { COMMON_PROPS } from '../../constants/commonProps.const'
import { Method } from '@/services/config'
import { omitBaseEntity } from '../../constants/selectors.const'
import { RedeterminacionService } from './redeterminacion.service'
import { RedeterminacionModel } from '.'
import { AreaMeta } from '../area/area.meta'
import { ObraMeta } from '../obra/obra.meta'
import { TipoRedeterminacionMeta } from '../tipoRedeterminacion/tipoRedeterminacion.meta'

export const RedeterminacionMeta = new MetaModel<RedeterminacionModel.Entity>({
  key: 'redeterminacion',
  service: RedeterminacionService,
  refreshRate: 'medium',
  title: {
    singular: 'Redeterminación',
    plural: 'Redeterminaciones',
  },
  faIcon: 'fa-solid fa-calculator',

  anchorField: 'numeroExpedienteSolicitud',
  props: {
    obra: new RefProp({
      getMetaModel: () => ObraMeta,
      field: {
        required: true,
      },
    }),
    numeroExpedienteSolicitud: new TextProp(
      'Número de Expediente de Solicitud',
      {
        field: {
          required: true,
        },
      },
    ),
    numeroExpediente: new TextProp('Número De Expediente de Redeterminación'),
    numeroResolucion: new TextProp('Número De Resolución'),
    montoTotal: new NumberProp('Monto Total', {
      decimal: true,
      isMoney: true,
      big: true,
      sum: true,
      pre: '$',
    }),
    nuevoMontoObra: new NumberProp('Nuevo Monto', {
      decimal: true,
      isMoney: true,
      big: true,
      sum: true,
      pre: '$',
    }),
    fechaRedeterminacion: new DateProp('Fecha de Solicitud'),
    fechaCertificacion: new DateProp('Fecha Certificación'),
    tieneHijas: new BooleanProp('AE Acum.'),
    tipoRedeterminacion: new RefProp({
      getMetaModel: () => TipoRedeterminacionMeta,
    }),
    area: new RefProp({
      getMetaModel: () => AreaMeta,
    }),
    redeterminacionesHijas: new RefListProp({
      getMetaModel: () => RedeterminacionMeta,
    }),
    observaciones: new TextLongProp('Observaciones'),
    ...COMMON_PROPS,
  },
})

RedeterminacionMeta.fieldsByService = [
  {
    methods: [Method.GetAll, Method.GetOne],
    fields: RedeterminacionMeta.allFields,
  },
  {
    methods: [Method.Create, Method.UpdateOne],
    groups: [{ fields: omitBaseEntity(RedeterminacionMeta.allFields) }],
  },
]
