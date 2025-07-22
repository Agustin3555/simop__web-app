import {
  DateProp,
  NumberProp,
  TextLongProp,
  RefProp,
  TextProp,
  buildMetaModel,
  defineProps,
} from '../../meta'
import { COMMON_PROPS } from '../../constants/commonProps.const'
import { Method } from '@/services/config'
import { omitBaseEntity } from '../../constants/selectors.const'
import { AmpliacionService } from './ampliacion.service'
import { AmpliacionModel } from '.'
import { ObraMeta } from '../obra/obra.meta'
import { AreaMeta } from '../area/area.meta'

const { props, allFields } = defineProps<AmpliacionModel.Entity>({
  obra: new RefProp({
    getMetaModel: () => ObraMeta,
    field: {
      required: true,
    },
  }),
  numero: new NumberProp('Número De Ampliación', {
    field: {
      required: true,
    },
  }),
  numeroResolucion: new TextProp('Número De Resolución'),
  numeroExpedienteSolicitud: new TextProp('Número de Expediente de Solicitud'),
  plazoMesesSolicitado: new NumberProp('Plazo de Meses Solicitado '),
  plazoMesesOtorgado: new NumberProp('Plazo de Meses Otorgado'),
  nuevaFechaFinObra: new DateProp('Nueva Fecha Fin De Obra'),
  fecha: new DateProp('Fecha'),
  observaciones: new TextLongProp('Observaciones'),
  area: new RefProp({
    getMetaModel: () => AreaMeta,
  }),
  ...COMMON_PROPS,
})

export const AmpliacionMeta = buildMetaModel(
  {
    key: 'ampliacion',
    service: AmpliacionService,
    refreshRate: 'medium',
    title: {
      singular: 'Ampliación',
      plural: 'Ampliaciones',
    },
    faIcon: 'fa-solid fa-expand',

    anchorField: 'numeroExpedienteSolicitud',
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
