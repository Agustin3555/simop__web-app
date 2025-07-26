import { Method } from '@/services/config'
import { omitBaseEntity } from '../../constants/selectors.const'
import { AmpliacionService } from './ampliacion.service'
import { MetaModelDefinition } from '../../meta/metaModel'
import { AmpliacionProps } from './ampliacion.props'
import { AmpliacionModel } from '.'

const { propFactories, allFields } = AmpliacionProps

export const AmpliacionMeta: MetaModelDefinition<AmpliacionModel.Entity> = {
  config: {
    key: 'ampliacion',
    service: AmpliacionService,
    refreshRate: 'medium',
    title: {
      singular: 'Ampliación',
      plural: 'Ampliaciones',
    },
    faIcon: 'fa-solid fa-expand',

    anchorField: 'numeroExpedienteSolicitud',
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
