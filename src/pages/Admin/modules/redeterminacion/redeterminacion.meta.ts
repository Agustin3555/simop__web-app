import { Method } from '@/services/config'
import { omitBaseEntity } from '../../constants/selectors.const'
import { RedeterminacionService } from './redeterminacion.service'
import { RedeterminacionProps } from './redeterminacion.props'
import { RedeterminacionModel } from '.'
import { MetaModelDefinition } from '../../meta/metaModel'

const { propFactories, allFields } = RedeterminacionProps

export const RedeterminacionMeta: MetaModelDefinition<RedeterminacionModel.Entity> =
  {
    config: {
      key: 'redeterminacion',
      service: RedeterminacionService,
      refreshRate: 'medium',
      title: {
        singular: 'Redeterminación',
        plural: 'Redeterminaciones',
      },
      faIcon: 'fa-solid fa-calculator',
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
