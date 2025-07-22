import {
  DateProp,
  NumberProp,
  TextLongProp,
  RefProp,
  TextProp,
  defineProps,
  buildMetaModel,
} from '../../meta'
import { COMMON_PROPS } from '../../constants/commonProps.const'
import { Method } from '@/services/config'
import { omitBaseEntity } from '../../constants/selectors.const'
import { ModificacionService } from './modificacion.service'
import { ModificacionModel } from '.'
import { AreaMeta } from '../area/area.meta'
import { ObraMeta } from '../obra/obra.meta'
import { TipoModificacionMeta } from '../tipoModificacion/tipoModificacion.meta'

const { props, allFields } = defineProps<ModificacionModel.Entity>({
  obra: new RefProp({
    getMetaModel: () => ObraMeta,
    field: {
      required: true,
    },
  }),
  numeroExpediente: new TextProp('Número De Expediente', {
    field: {
      required: true,
    },
  }),
  numeroResolucion: new TextProp('Número De Resolución'),
  monto: new NumberProp('Monto', {
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
  fecha: new DateProp('Fecha'),
  tipoModificacion: new RefProp({
    getMetaModel: () => TipoModificacionMeta,
  }),
  area: new RefProp({
    getMetaModel: () => AreaMeta,
  }),
  observaciones: new TextLongProp('Observaciones'),
  ...COMMON_PROPS,
})

export const ModificacionMeta = buildMetaModel(
  {
    key: 'modificacion',
    service: ModificacionService,
    refreshRate: 'medium',
    title: {
      singular: 'Modificación',
      plural: 'Modificaciones',
    },
    faIcon: 'fa-solid fa-file-pen',
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
