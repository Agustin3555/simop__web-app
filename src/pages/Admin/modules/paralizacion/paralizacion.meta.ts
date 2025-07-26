import { Method } from '@/services/config'
import { omitBaseEntity } from '../../constants/selectors.const'
import { ParalizacionService } from './paralizacion.service'
import { ParalizacionProps } from './paralizacion.props'
import { ParalizacionModel } from '.'
import { MetaModelDefinition } from '../../meta/metaModel'

const { propFactories, allFields } = ParalizacionProps

export const ParalizacionMeta: MetaModelDefinition<ParalizacionModel.Entity> = {
  config: {
    key: 'paralizacion',
    service: ParalizacionService,
    refreshRate: 'medium',
    title: {
      singular: 'Paralización',
      plural: 'Paralizaciones',
    },
    faIcon: 'fa-solid fa-circle-stop',
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
