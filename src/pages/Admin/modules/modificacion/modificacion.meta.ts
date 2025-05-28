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
import { TipoModificacionMeta } from '../tipoModificacion'
import { DireccionMeta } from '../direccion'
import { DepartamentoMeta } from '../departamento'
import { ObraMeta } from '../obra'
import { ModificacionService } from './modificacion.service'
import { ModificacionModel } from '.'

export const ModificacionMeta = new MetaModel<ModificacionModel.Entity>({
  key: 'modificacion',
  service: ModificacionService,
  refreshRate: 'medium',
  title: {
    singular: 'Modificación',
    plural: 'Modificaciones',
  },
  faIcon: 'fa-solid fa-',

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
    direccion: new RefProp({
      getMetaModel: () => DireccionMeta,
    }),
    departamento: new RefProp({
      getMetaModel: () => DepartamentoMeta,
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
