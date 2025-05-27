import {
  NumberProp,
  RefListProp,
  MetaModel,
  TextProp,
} from '../../services/config'
import { COMMON_PROPS } from '../../constants/commonProps.const'
import { Method } from '@/services/config'
import { omitBaseEntity } from '../../constants/selectors.const'
import { TipoProfesionMeta } from '../tipoProfesion'
import { InspectorService } from './inspector.service'
import { InspectorModel } from '.'

export const InspectorMeta = new MetaModel<InspectorModel.Entity>({
  key: 'inspector',
  service: InspectorService,
  refreshRate: 'low',
  title: {
    singular: 'Inspector',
    plural: 'Inspectores',
  },
  faIcon: 'fa-solid fa-helmet-safety',

  anchorField: 'apellido',
  props: {
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
  },
})

InspectorMeta.fieldsByService = [
  {
    methods: [Method.GetAll, Method.GetOne],
    fields: InspectorMeta.allFields,
  },
  {
    methods: [Method.Create, Method.UpdateOne],
    groups: [{ key: '', fields: omitBaseEntity(InspectorMeta.allFields) }],
  },
]
