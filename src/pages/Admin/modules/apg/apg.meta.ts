import { MetaModel, TextProp } from '../../meta'
import { COMMON_PROPS } from '../../constants/commonProps.const'
import { Method } from '@/services/config'
import { omitBaseEntity } from '../../constants/selectors.const'
import { APGService } from './apg.service'
import { APGModel } from '.'

export const APGMeta = new MetaModel<APGModel.Entity>({
  key: 'apg',
  service: APGService,
  refreshRate: 'low',
  title: {
    singular: 'APG',
    plural: 'APGs',
  },
  faIcon: 'fa-solid fa-vector-square',

  anchorField: 'nombre',
  props: {
    nombre: new TextProp('Nombre', {
      field: {
        required: true,
      },
    }),
    color: new TextProp('Color', {
      field: {
        required: true,
      },
    }),
    ...COMMON_PROPS,
  },
})

APGMeta.fieldsByService = [
  {
    methods: [Method.GetAll, Method.GetOne],
    fields: APGMeta.allFields,
  },
  {
    methods: [Method.Create, Method.UpdateOne],
    groups: [{ key: '', fields: omitBaseEntity(APGMeta.allFields) }],
  },
]
