import { omitBaseEntity } from '../../constants/selectors.const'
import { ProvinciaService } from './provincia.service'
import { ProvinciaModel } from '.'
import { MetaModelDefinition } from '../../meta/metaModel'
import { ProvinciaProps } from './provincia.props'

const { propFactories, allFields } = ProvinciaProps

export const ProvinciaMeta: MetaModelDefinition<ProvinciaModel.Entity> = {
  config: {
    key: 'provincia',
    service: ProvinciaService,
    refreshRate: 'low',
    title: {
      singular: 'Provincia',
      plural: 'Provincias',
    },
    faIcon: 'fa-solid fa-vector-square',
    anchorField: 'nombre',
    allFields,
    propFactories,
  },

  mutationsFields: {
    add: [{ fields: omitBaseEntity(allFields) }],
    edit: [{ fields: omitBaseEntity(allFields) }],
  },
}
