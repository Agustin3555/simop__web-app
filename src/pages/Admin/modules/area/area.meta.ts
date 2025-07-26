import { Method } from '@/services/config'
import { omitBaseEntity } from '../../constants/selectors.const'
import { AreaService } from './area.service'
import { AreaModel } from '.'
import { MetaModelDefinition } from '../../meta/metaModel'
import { AreaProps } from './area.props'

const { propFactories, allFields } = AreaProps

export const AreaMeta: MetaModelDefinition<AreaModel.Entity> = {
  config: {
    key: 'area',
    service: AreaService,
    title: {
      singular: 'Área',
      plural: 'Áreas',
    },
    faIcon: 'fa-solid fa-network-wired',
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
