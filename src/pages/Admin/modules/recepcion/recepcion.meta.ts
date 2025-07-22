import {
  DateProp,
  TextLongProp,
  RefProp,
  NumberProp,
  defineProps,
  buildMetaModel,
} from '../../meta'
import { COMMON_PROPS } from '../../constants/commonProps.const'
import { Method } from '@/services/config'
import { omitBaseEntity } from '../../constants/selectors.const'
import { RecepcionService } from './recepcion.service'
import { RecepcionModel } from '.'
import { AreaMeta } from '../area/area.meta'
import { ObraMeta } from '../obra/obra.meta'
import { TipoRecepcionMeta } from '../tipoRecepcion/tipoRecepcion.meta'

const { props, allFields } = defineProps<RecepcionModel.Entity>({
  obra: new RefProp({
    getMetaModel: () => ObraMeta,
    field: { required: true },
  }),
  numeroActa: new NumberProp('Número De Acta', {
    field: { required: true },
  }),
  fecha: new DateProp('Fecha'),
  tipoRecepcion: new RefProp({
    getMetaModel: () => TipoRecepcionMeta,
  }),
  area: new RefProp({
    getMetaModel: () => AreaMeta,
  }),
  observaciones: new TextLongProp('Observaciones'),
  ...COMMON_PROPS,
})

export const RecepcionMeta = buildMetaModel(
  {
    key: 'recepcion',
    service: RecepcionService,
    refreshRate: 'medium',
    title: {
      singular: 'Recepcion',
      plural: 'Recepciones',
    },
    faIcon: 'fa-solid fa-handshake',
    anchorField: 'numeroActa',
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
