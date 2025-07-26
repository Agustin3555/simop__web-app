import { Method } from '@/services/config'
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
    propFactories,
  },

  fieldsByService: [
    {
      methods: [Method.GetAll, Method.GetOne],
      fields: allFields,
    },
    {
      methods: [Method.Create, Method.UpdateOne],
      groups: [{ fields: omitBaseEntity(allFields) }],
    },
  ],
}
