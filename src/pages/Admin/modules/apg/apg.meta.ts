import { MetaModel, NumberProp, TextProp } from '../../meta'
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

  anchorField: 'numero',
  props: {
    numero: new NumberProp('Número', {
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
    groups: [{ fields: omitBaseEntity(APGMeta.allFields) }],
  },
]
