import {
  defineProps,
  buildMetaModel,
  createRefListProp,
  createTextProp,
  createNumberProp,
} from '../../meta'
import { COMMON_PROPS } from '../../constants/commonProps.const'
import { Method } from '@/services/config'
import { omitBaseEntity } from '../../constants/selectors.const'
import { InspectorService } from './inspector.service'
import { InspectorModel } from '.'
import { TipoProfesionMeta } from '../tipoProfesion/tipoProfesion.meta'

const { props, allFields } = defineProps<InspectorModel.Entity>({
  cuil: createNumberProp({
    title: 'CUIL',
    config: {
      isBig: true,
      field: {
        required: true,
      },
    },
  }),
  apellido: createTextProp({
    title: 'Apellido',
    config: {
      field: {
        required: true,
      },
    },
  }),
  nombre: createTextProp({
    title: 'Nombre',
  }),
  profesiones: createRefListProp({
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
