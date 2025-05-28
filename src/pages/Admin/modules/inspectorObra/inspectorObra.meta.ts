import { RefProp, MetaModel, BooleanProp, DateProp } from '../../meta'
import { COMMON_PROPS } from '../../constants/commonProps.const'
import { Method } from '@/services/config'
import { omitBaseEntity } from '../../constants/selectors.const'
import { InspectorObraService } from './inspectorObra.service'
import { InspectorObraModel } from '.'
import { InspectorMeta } from '../inspector/inspector.meta'
import { ObraMeta } from '../obra/obra.meta'
import { TipoInspectorMeta } from '../tipoInspector/tipoInspector.meta'
import { TipoProfesionMeta } from '../tipoProfesion/tipoProfesion.meta'

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
