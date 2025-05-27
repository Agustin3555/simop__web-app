import {
  DateProp,
  TextLongProp,
  RefProp,
  MetaModel,
  TextProp,
} from '../../services/config'
import { COMMON_PROPS } from '../../constants/commonProps.const'
import { Method } from '@/services/config'
import { omitBaseEntity } from '../../constants/selectors.const'
import { RescisionService, RescisionModel } from '.'
import { TipoRescisionMeta } from '../tipoRescision'
import { DireccionMeta } from '../direccion'
import { DepartamentoMeta } from '../departamento'
import { ObraMeta } from '../obra'

export const RescisionMeta = new MetaModel<RescisionModel.Entity>({
  key: 'rescision',
  service: RescisionService,
  refreshRate: 'medium',
  title: {
    singular: 'Rescision',
    plural: 'Rescisiones',
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
    fecha: new DateProp('Fecha'),
    tipoRescision: new RefProp({
      getMetaModel: () => TipoRescisionMeta,
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

RescisionMeta.fieldsByService = [
  {
    methods: [Method.GetAll, Method.GetOne],
    fields: RescisionMeta.allFields,
  },
  {
    methods: [Method.Create, Method.UpdateOne],
    groups: [{ key: '', fields: omitBaseEntity(RescisionMeta.allFields) }],
  },
]
