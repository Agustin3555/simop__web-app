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
import { ParalizacionService } from './paralizacion.service'
import { ParalizacionModel } from '.'
import { AreaMeta } from '../area/area.meta'
import { ObraMeta } from '../obra/obra.meta'
import { TipoParalizacionMeta } from '../tipoParalizacion/tipoParalizacion.meta'

const { props, allFields } = defineProps<ParalizacionModel.Entity>({
  obra: createRefProp({
    getMetaModel: () => ObraMeta,
    config: {
      field: {
        required: true,
      },
    },
  }),
  numero: createNumberProp({
    title: 'Número de Paralización',
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
  fechaReinicio: createDateProp({
    title: 'Fecha Reinicio',
  }),
  nuevaFechaFinObra: createDateProp({
    title: 'Nueva Fecha Fin de Obra',
  }),
  fecha: createDateProp({
    title: 'Fecha',
  }),
  tipoParalizacion: createRefProp({
    getMetaModel: () => TipoParalizacionMeta,
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
