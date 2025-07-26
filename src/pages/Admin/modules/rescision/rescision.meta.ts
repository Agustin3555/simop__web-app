import { Method } from '@/services/config'
import { omitBaseEntity } from '../../constants/selectors.const'
import { RescisionService } from './rescision.service'
import { RescisionProps } from './rescision.props'
import { RescisionModel } from '.'
import { MetaModelDefinition } from '../../meta/metaModel'

const { propFactories, allFields } = RescisionProps

export const RescisionMeta: MetaModelDefinition<RescisionModel.Entity> = {
  config: {
    key: 'rescision',
    service: RescisionService,
    refreshRate: 'medium',
    title: {
      singular: 'Rescision',
      plural: 'Rescisiones',
    },
    faIcon: 'fa-solid fa-ban',
    anchorField: 'numeroExpediente',
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
