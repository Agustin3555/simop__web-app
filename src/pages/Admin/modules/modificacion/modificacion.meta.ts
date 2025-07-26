import { Method } from '@/services/config'
import { omitBaseEntity } from '../../constants/selectors.const'
import { ModificacionService } from './modificacion.service'
import { ModificacionProps } from './modificacion.props'
import { MetaModelDefinition } from '../../meta/metaModel'
import { ModificacionModel } from '.'

const { propFactories, allFields } = ModificacionProps

export const ModificacionMeta: MetaModelDefinition<ModificacionModel.Entity> = {
  config: {
    key: 'modificacion',
    service: ModificacionService,
    refreshRate: 'medium',
    title: {
      singular: 'Modificación',
      plural: 'Modificaciones',
    },
    faIcon: 'fa-solid fa-file-pen',
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
