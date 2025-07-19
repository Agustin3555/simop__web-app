import {
  DateProp,
  TextLongProp,
  RefProp,
  MetaModel,
  TextProp,
} from '../../meta'
import { COMMON_PROPS } from '../../constants/commonProps.const'
import { Method } from '@/services/config'
import { omitBaseEntity } from '../../constants/selectors.const'
import { RescisionModel } from '.'
import { RescisionService } from './rescision.service'
import { AreaMeta } from '../area/area.meta'
import { ObraMeta } from '../obra/obra.meta'
import { TipoRescisionMeta } from '../tipoRescision/tipoRescision.meta'

export const RescisionMeta = new MetaModel<RescisionModel.Entity>({
  key: 'rescision',
  service: RescisionService,
  refreshRate: 'medium',
  title: {
    singular: 'Rescision',
    plural: 'Rescisiones',
  },
  faIcon: 'fa-solid fa-ban',

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
    area: new RefProp({
      getMetaModel: () => AreaMeta,
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
    groups: [{ fields: omitBaseEntity(RescisionMeta.allFields) }],
  },
]
