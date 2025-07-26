import { Method } from '@/services/config'
import { omitBaseEntity } from '../../constants/selectors.const'
import { RecepcionService } from './recepcion.service'
import { RecepcionProps } from './recepcion.props'
import { RecepcionModel } from '.'
import { MetaModelDefinition } from '../../meta/metaModel'

const { propFactories, allFields } = RecepcionProps

export const RecepcionMeta: MetaModelDefinition<RecepcionModel.Entity> = {
  config: {
    key: 'recepcion',
    service: RecepcionService,
    refreshRate: 'medium',
    title: {
      singular: 'Recepcion',
      plural: 'Recepciones',
    },
    faIcon: 'fa-solid fa-handshake',
    anchorField: 'numeroActa',
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
