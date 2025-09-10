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
      allFields,
      propFactories,
    },

    mutationsFields: {
      add: [{ fields: omitBaseEntity(allFields) }],
      edit: [{ fields: omitBaseEntity(allFields) }],
    },
  }
