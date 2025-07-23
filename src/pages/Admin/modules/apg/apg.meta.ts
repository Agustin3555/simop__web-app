import {
  defineProps,
  buildMetaModel,
  createTextProp,
  createNumberProp,
} from '../../meta'
import { COMMON_PROPS } from '../../constants/commonProps.const'
import { Method } from '@/services/config'
import { omitBaseEntity } from '../../constants/selectors.const'
import { APGService } from './apg.service'
import { APGModel } from '.'

const { props, allFields } = defineProps<APGModel.Entity>({
  numero: createNumberProp({
    title: 'Número',
    config: {
      field: {
        required: true,
      },
    },
  }),
  color: createTextProp({
    title: 'Color',
    config: {
      field: {
        required: true,
      },
    },
  }),
  ...COMMON_PROPS,
})

export const APGMeta = buildMetaModel(
  {
    key: 'apg',
    service: APGService,
    refreshRate: 'low',
    title: {
      singular: 'APG',
      plural: 'APGs',
    },
    faIcon: 'fa-solid fa-vector-square',
    anchorField: 'numero',
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
