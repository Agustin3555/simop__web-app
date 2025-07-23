import {
  defineProps,
  buildMetaModel,
  createBooleanProp,
  createDateProp,
  createRefProp,
} from '../../meta'
import { COMMON_PROPS } from '../../constants/commonProps.const'
import { Method } from '@/services/config'
import { omitBaseEntity } from '../../constants/selectors.const'
import { InspectorObraService } from './inspectorObra.service'
import { InspectorObraModel } from '.'
import { InspectorMeta } from '../inspector/inspector.meta'
import { ObraMeta } from '../obra/obra.meta'
import { TipoInspectorMeta } from '../tipoInspector/tipoInspector.meta'
import { TipoProfesionMeta } from '../tipoProfesion/tipoProfesion.meta'

const { props, allFields } = defineProps<InspectorObraModel.Entity>({
  obra: createRefProp({
    getMetaModel: () => ObraMeta,
    config: {
      field: {
        required: true,
      },
    },
  }),
  inspector: createRefProp({
    getMetaModel: () => InspectorMeta,
    config: {
      field: {
        required: true,
      },
    },
  }),
  tipoInspector: createRefProp({
    getMetaModel: () => TipoInspectorMeta,
  }),
  tipoProfesion: createRefProp({
    getMetaModel: () => TipoProfesionMeta,
  }),
  vigencia: createBooleanProp({
    title: 'Vigencia',
    config: {
      falseText: 'No Vigente',
      trueText: 'Vigente',
    },
  }),
  fecha: createDateProp({
    title: 'Fecha',
  }),
  ...COMMON_PROPS,
})

export const InspectorObraMeta = buildMetaModel(
  {
    key: 'inspectorObra',
    service: InspectorObraService,
    refreshRate: 'medium',
    title: {
      singular: 'Inspector de Obra',
      plural: 'Inspectores de Obra',
    },
    faIcon: 'fa-solid fa-helmet-safety',
    anchorField: 'id',
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
