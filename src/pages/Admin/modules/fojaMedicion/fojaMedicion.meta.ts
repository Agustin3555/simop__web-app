import { omitBaseEntity } from '../../constants/selectors.const'
import { FojaMedicionService } from './fojaMedicion.service'
import { FojaMedicionModel } from '.'
import { MetaModelDefinition } from '../../meta/metaModel'
import { FojaMedicionProps } from './fojaMedicion.props'

const { propFactories, allFields } = FojaMedicionProps

export const FojaMedicionMeta: MetaModelDefinition<FojaMedicionModel.Entity> = {
  config: {
    key: 'fojaMedicion',
    service: FojaMedicionService,
    refreshRate: 'medium',
    title: {
      singular: 'Foja de Medición',
      plural: 'Fojas de Mediciones',
    },
    faIcon: 'fa-solid fa-clipboard-list',
    anchorField: 'numeroExpediente',
    allFields,
    propFactories,
  },

  mutationsFields: {
    add: [{ fields: omitBaseEntity(allFields) }],
    edit: [{ fields: omitBaseEntity(allFields) }],
  },
}
