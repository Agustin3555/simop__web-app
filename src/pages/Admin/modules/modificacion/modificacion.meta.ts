import {
  DateProp,
  NumberProp,
  TextLongProp,
  RefProp,
  MetaModel,
  TextProp,
} from '../../meta'
import { COMMON_PROPS } from '../../constants/commonProps.const'
import { Method } from '@/services/config'
import { omitBaseEntity } from '../../constants/selectors.const'
import { ModificacionService } from './modificacion.service'
import { ModificacionModel } from '.'
import { AreaMeta } from '../area/area.meta'
import { ObraMeta } from '../obra/obra.meta'
import { TipoModificacionMeta } from '../tipoModificacion/tipoModificacion.meta'

export const ModificacionMeta = new MetaModel<ModificacionModel.Entity>({
  key: 'modificacion',
  service: ModificacionService,
  refreshRate: 'medium',
  title: {
    singular: 'Modificación',
    plural: 'Modificaciones',
  },
  faIcon: 'fa-solid fa-file-pen',

  anchorField: 'numeroExpediente',
  props: {
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
  },
})

ModificacionMeta.fieldsByService = [
  {
    methods: [Method.GetAll, Method.GetOne],
    fields: ModificacionMeta.allFields,
  },
  {
    methods: [Method.Create, Method.UpdateOne],
    groups: [{ key: '', fields: omitBaseEntity(ModificacionMeta.allFields) }],
  },
]
