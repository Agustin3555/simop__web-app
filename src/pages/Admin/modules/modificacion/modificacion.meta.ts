import {
  defineProps,
  buildMetaModel,
  createDateProp,
  createTextProp,
  createRefProp,
  createNumberProp,
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
  obra: createRefProp({
    getMetaModel: () => ObraMeta,
    config: {
      field: {
        required: true,
      },
    },
  }),
  numeroExpediente: createTextProp({
    title: 'Número De Expediente',
    config: {
      field: {
        required: true,
      },
    },
  }),
  numeroResolucion: createTextProp({
    title: 'Número De Resolución',
  }),
  monto: createNumberProp({
    title: 'Monto',
    config: {
      pre: '$',
      isDecimal: true,
      isMoney: true,
      isBig: true,
      calculate: 'sum',
    },
  }),
  nuevoMontoObra: createNumberProp({
    title: 'Nuevo Monto',
    config: {
      pre: '$',
      isDecimal: true,
      isMoney: true,
      isBig: true,
      calculate: 'sum',
    },
  }),
  fecha: createDateProp({
    title: 'Fecha',
  }),
  tipoModificacion: createRefProp({
    getMetaModel: () => TipoModificacionMeta,
  }),
  area: createRefProp({
    getMetaModel: () => AreaMeta,
  }),
  observaciones: createTextProp({
    title: 'Observaciones',
    config: {
      isLong: true,
    },
  }),
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
