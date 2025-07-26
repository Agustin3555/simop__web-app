import { Method } from '@/services/config'
import { omitBaseEntity } from '../../constants/selectors.const'
import { TipoRecepcionService } from './tipoRecepcion.service'
import { TipoRecepcionProps } from './tipoRecepcion.props'
import { TipoRecepcionModel } from '.'
import { MetaModelDefinition } from '../../meta/metaModel'

const { propFactories, allFields } = TipoRecepcionProps

export const TipoRecepcionMeta: MetaModelDefinition<TipoRecepcionModel.Entity> =
  {
    config: {
      key: 'tipoRecepcion',
      service: TipoRecepcionService,
      title: {
        singular: 'Recepción',
        plural: 'Tipos de Recepción',
      },
      faIcon: 'fa-solid fa-shapes',
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
