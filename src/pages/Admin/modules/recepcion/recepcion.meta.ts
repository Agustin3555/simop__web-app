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
import { RecepcionService } from './recepcion.service'
import { RecepcionModel } from '.'
import { AreaMeta } from '../area/area.meta'
import { ObraMeta } from '../obra/obra.meta'
import { TipoRecepcionMeta } from '../tipoRecepcion/tipoRecepcion.meta'

const { props, allFields } = defineProps<RecepcionModel.Entity>({
  obra: createRefProp({
    getMetaModel: () => ObraMeta,
    config: {
      field: {
        required: true,
      },
    },
  }),
  numeroActa: createNumberProp({
    title: 'Número De Acta',
    config: {
      field: {
        required: true,
      },
    },
  }),
  fecha: createDateProp({
    title: 'Fecha',
  }),
  tipoRecepcion: createRefProp({
    getMetaModel: () => TipoRecepcionMeta,
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
