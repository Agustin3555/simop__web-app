import { omitBaseEntity } from '../../constants/selectors.const'
import { PaisService } from './pais.service'
import { MetaModelDefinition } from '../../meta/metaModel'
import { PaisModel } from '.'
import { PaisProps } from './pais.props'

const { propFactories, allFields } = PaisProps

export const PaisMeta: MetaModelDefinition<PaisModel.Entity> = {
  config: {
    key: 'pais',
    service: PaisService,
    title: {
      singular: 'País',
      plural: 'Países',
    },
    faIcon: 'fa-solid fa-earth-americas',
    anchorField: 'nombre',
    allFields,
    propFactories,
  },

  mutationsFields: {
    add: [{ fields: omitBaseEntity(allFields) }],
    edit: [{ fields: omitBaseEntity(allFields) }],
  },
}
