import {
  buildMetaModel,
  defineProps,
  createDateProp,
  createTextProp,
  createRefProp,
  createNumberProp,
} from '../../meta'
import { COMMON_PROPS } from '../../constants/commonProps.const'
import { Method } from '@/services/config'
import { omitBaseEntity } from '../../constants/selectors.const'
import { AmpliacionService } from './ampliacion.service'
import { AmpliacionModel } from '.'
import { ObraMeta } from '../obra/obra.meta'
import { AreaMeta } from '../area/area.meta'

const { props, allFields } = defineProps<AmpliacionModel.Entity>({
  obra: createRefProp({
    getMetaModel: () => ObraMeta,
    config: {
      field: {
        required: true,
      },
    },
  }),
  numero: createNumberProp({
    title: 'Número De Ampliación',
    config: {
      field: {
        required: true,
      },
    },
  }),
  numeroResolucion: createTextProp({
    title: 'Número De Resolución',
  }),
  numeroExpedienteSolicitud: createTextProp({
    title: 'Número de Expediente de Solicitud',
  }),
  plazoMesesSolicitado: createNumberProp({
    title: 'Plazo de Meses Solicitado',
  }),
  plazoMesesOtorgado: createNumberProp({
    title: 'Plazo de Meses Otorgado',
  }),
  nuevaFechaFinObra: createDateProp({
    title: 'Nueva Fecha Fin De Obra',
  }),
  fecha: createDateProp({
    title: 'Fecha',
  }),
  observaciones: createTextProp({
    title: 'Observaciones',
    config: {
      isLong: true,
    },
  }),
  area: createRefProp({
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
