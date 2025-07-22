import {
  NumberProp,
  RefProp,
  TextProp,
  TextLongProp,
  DateProp,
  defineProps,
  buildMetaModel,
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
  obra: new RefProp({
    getMetaModel: () => ObraMeta,
    field: {
      required: true,
    },
  }),
  numeroExpediente: new TextProp('Numero de Expediente de Foja', {
    field: {
      required: true,
    },
  }),
  numero: new NumberProp('Número de foja', {
    field: {
      required: true,
    },
  }),
  avance: new NumberProp('Porcentaje de avance', {
    decimal: true,
    sub: '%',
  }),
  fechaFoja: new DateProp('Fecha de Solicitud'),
  fechaCertificacion: new DateProp('Fecha Certificación'),
  montoTotal: new NumberProp('Monto Total', {
    decimal: true,
    isMoney: true,
    big: true,
    sum: true,
    pre: '$',
  }),
  inspector: new RefProp({
    getMetaModel: () => InspectorMeta,
  }),
  area: new RefProp({
    getMetaModel: () => AreaMeta,
  }),
  observaciones: new TextLongProp('Observaciones'),
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
