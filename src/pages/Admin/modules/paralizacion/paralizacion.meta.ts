import {
  DateProp,
  NumberProp,
  TextLongProp,
  RefProp,
  MetaModel,
  TextProp,
} from '../../services/config'
import { COMMON_PROPS } from '../../constants/commonProps.const'
import { Method } from '@/services/config'
import { omitBaseEntity } from '../../constants/selectors.const'
import { TipoParalizacionMeta } from '../tipoParalizacion'
import { DireccionMeta } from '../direccion'
import { DepartamentoMeta } from '../departamento'
import { ObraMeta } from '../obra'
import { ParalizacionService } from './paralizacion.service'
import { ParalizacionModel } from '.'

export const ParalizacionMeta = new MetaModel<ParalizacionModel.Entity>({
  key: 'paralizacion',
  service: ParalizacionService,
  refreshRate: 'medium',
  title: {
    singular: 'Paralización',
    plural: 'Paralizaciones',
  },
  faIcon: 'fa-solid fa-circle-stop',

  anchorField: 'numeroExpediente',
  props: {
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
    fechaReinicio: new DateProp('Fecha Reinicio', {}),
    nuevaFechaFinObra: new DateProp('Nueva Fecha Fin de Obra', {}),
    fecha: new DateProp('Fecha'),
    tipoParalizacion: new RefProp({
      getMetaModel: () => TipoParalizacionMeta,
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

ParalizacionMeta.fieldsByService = [
  {
    methods: [Method.GetAll, Method.GetOne],
    fields: ParalizacionMeta.allFields,
  },
  {
    methods: [Method.Create, Method.UpdateOne],
    groups: [{ key: '', fields: omitBaseEntity(ParalizacionMeta.allFields) }],
  },
]
