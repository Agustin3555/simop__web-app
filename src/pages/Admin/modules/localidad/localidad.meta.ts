import { omitBaseEntity } from '../../constants/selectors.const'
import { LocalidadService } from './localidad.service'
import { LocalidadModel } from '.'
import { LocalidadProps } from './localidad.props'
import { MetaModelDefinition } from '../../meta/metaModel'

const { propFactories, allFields } = LocalidadProps

export const LocalidadMeta: MetaModelDefinition<LocalidadModel.Entity> = {
  config: {
    key: 'localidad',
    title: {
      singular: 'Localidad',
      plural: 'Localidades',
    },
    faIcon: 'fa-solid fa-location-dot',

    service: LocalidadService,
    refreshRate: 'low',
    anchorField: 'nombre',
    allFields,
    propFactories,
  },

  mutationsFields: {
    add: [{ fields: omitBaseEntity(allFields) }],
    edit: [{ fields: omitBaseEntity(allFields) }],
  },
}
