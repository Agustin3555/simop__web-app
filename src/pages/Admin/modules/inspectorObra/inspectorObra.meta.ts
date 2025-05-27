import {
  RefProp,
  MetaModel,
  BooleanProp,
  DateProp,
} from '../../services/config'
import { COMMON_PROPS } from '../../constants/commonProps.const'
import { Method } from '@/services/config'
import { omitBaseEntity } from '../../constants/selectors.const'
import { InspectorMeta } from '../inspector'
import { TipoInspectorMeta } from '../tipoInspector'
import { TipoProfesionMeta } from '../tipoProfesion'
import { ObraMeta } from '../obra'
import { InspectorObraService } from './inspectorObra.service'
import { InspectorObraModel } from '.'

export const InspectorObraMeta = new MetaModel<InspectorObraModel.Entity>({
  key: 'inspectorObra',
  service: InspectorObraService,
  refreshRate: 'medium',
  title: {
    singular: 'Inspector de Obra',
    plural: 'Inspectores de Obra',
  },
  faIcon: 'fa-solid fa-',

  anchorField: 'id',
  props: {
    obra: new RefProp({
      getMetaModel: () => ObraMeta,
      field: {
        required: true,
      },
    }),
    inspector: new RefProp({
      getMetaModel: () => InspectorMeta,
      field: {
        required: true,
      },
    }),
    tipoInspector: new RefProp({
      getMetaModel: () => TipoInspectorMeta,
    }),
    tipoProfesion: new RefProp({
      getMetaModel: () => TipoProfesionMeta,
    }),
    vigencia: new BooleanProp('Vigencia', {
      falseText: 'No Vigente',
      trueText: 'Vigente',
    }),
    fecha: new DateProp('Fecha'),
    ...COMMON_PROPS,
  },
})

InspectorObraMeta.fieldsByService = [
  {
    methods: [Method.GetAll, Method.GetOne],
    fields: InspectorObraMeta.allFields,
  },
  {
    methods: [Method.Create, Method.UpdateOne],
    groups: [{ key: '', fields: omitBaseEntity(InspectorObraMeta.allFields) }],
  },
]
