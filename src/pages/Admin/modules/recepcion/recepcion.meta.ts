import {
  DateProp,
  TextLongProp,
  RefProp,
  MetaModel,
  NumberProp,
} from '../../meta'
import { COMMON_PROPS } from '../../constants/commonProps.const'
import { Method } from '@/services/config'
import { omitBaseEntity } from '../../constants/selectors.const'
import { RecepcionService } from './recepcion.service'
import { RecepcionModel } from '.'
import { DepartamentoMeta } from '../departamento/departamento.meta'
import { DireccionMeta } from '../direccion/direccion.meta'
import { ObraMeta } from '../obra/obra.meta'
import { TipoRecepcionMeta } from '../tipoRecepcion/tipoRecepcion.meta'

export const RecepcionMeta = new MetaModel<RecepcionModel.Entity>({
  key: 'recepcion',
  service: RecepcionService,
  refreshRate: 'medium',
  title: {
    singular: 'Recepcion',
    plural: 'Recepciones',
  },
  faIcon: 'fa-solid fa-',

  anchorField: 'numeroActa',
  props: {
    obra: new RefProp({
      getMetaModel: () => ObraMeta,
      field: {
        required: true,
      },
    }),
    numeroActa: new NumberProp('Número De Acta', {
      field: {
        required: true,
      },
    }),
    fecha: new DateProp('Fecha'),
    tipoRecepcion: new RefProp({
      getMetaModel: () => TipoRecepcionMeta,
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

RecepcionMeta.fieldsByService = [
  {
    methods: [Method.GetAll, Method.GetOne],
    fields: RecepcionMeta.allFields,
  },
  {
    methods: [Method.Create, Method.UpdateOne],
    groups: [{ key: '', fields: omitBaseEntity(RecepcionMeta.allFields) }],
  },
]
