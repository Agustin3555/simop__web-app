import {
  NumberProp,
  RefListProp,
  TextProp,
  defineProps,
  buildMetaModel,
} from '../../meta'
import { COMMON_PROPS } from '../../constants/commonProps.const'
import { Method } from '@/services/config'
import { omitBaseEntity } from '../../constants/selectors.const'
import { InspectorService } from './inspector.service'
import { InspectorModel } from '.'
import { TipoProfesionMeta } from '../tipoProfesion/tipoProfesion.meta'

const { props, allFields } = defineProps<InspectorModel.Entity>({
  cuil: new NumberProp('CUIL', {
    big: true,
    field: {
      required: true,
    },
  }),
  apellido: new TextProp('Apellido', {
    field: {
      required: true,
    },
  }),
  nombre: new TextProp('Nombre'),
  profesiones: new RefListProp({
    getMetaModel: () => TipoProfesionMeta,
  }),
  ...COMMON_PROPS,
})

export const InspectorMeta = buildMetaModel(
  {
    key: 'inspector',
    service: InspectorService,
    refreshRate: 'low',
    title: {
      singular: 'Inspector',
      plural: 'Inspectores',
    },
    faIcon: 'fa-solid fa-helmet-safety',
    anchorField: 'apellido',
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
