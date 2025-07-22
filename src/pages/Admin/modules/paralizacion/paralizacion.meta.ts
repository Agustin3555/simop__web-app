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
import { ParalizacionService } from './paralizacion.service'
import { ParalizacionModel } from '.'
import { AreaMeta } from '../area/area.meta'
import { ObraMeta } from '../obra/obra.meta'
import { TipoParalizacionMeta } from '../tipoParalizacion/tipoParalizacion.meta'

const { props, allFields } = defineProps<ParalizacionModel.Entity>({
  obra: new RefProp({
    getMetaModel: () => ObraMeta,
    field: {
      required: true,
    },
  }),
  numero: new NumberProp('Número de Paralización', {
    field: {
      required: true,
    },
  }),
  numeroExpediente: new TextProp('Número De Expediente', {
    field: {
      required: true,
    },
  }),
  fechaReinicio: new DateProp('Fecha Reinicio'),
  nuevaFechaFinObra: new DateProp('Nueva Fecha Fin de Obra'),
  fecha: new DateProp('Fecha'),
  tipoParalizacion: new RefProp({
    getMetaModel: () => TipoParalizacionMeta,
  }),
  area: new RefProp({
    getMetaModel: () => AreaMeta,
  }),
  observaciones: new TextLongProp('Observaciones'),
  ...COMMON_PROPS,
})

export const ParalizacionMeta = buildMetaModel(
  {
    key: 'paralizacion',
    service: ParalizacionService,
    refreshRate: 'medium',
    title: {
      singular: 'Paralización',
      plural: 'Paralizaciones',
    },
    faIcon: 'fa-solid fa-circle-stop',
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
