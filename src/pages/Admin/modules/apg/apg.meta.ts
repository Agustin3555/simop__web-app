import { omitBaseEntity } from '../../constants/selectors.const'
import { APGService } from './apg.service'
import { MetaModelDefinition } from '../../meta/metaModel'
import { APGProps } from './apg.props'
import { APGModel } from '.'

const { propFactories, allFields } = APGProps

export const APGMeta: MetaModelDefinition<APGModel.Entity> = {
  config: {
    key: 'apg',
    service: APGService,
    refreshRate: 'low',
    title: {
      singular: 'APG',
      plural: 'APGs',
    },
    faIcon: 'fa-solid fa-vector-square',
    anchorField: 'numero',
    allFields,
    propFactories,
  },

  mutationsFields: {
    add: [{ fields: omitBaseEntity(allFields) }],
    edit: [{ fields: omitBaseEntity(allFields) }],
  },
}
