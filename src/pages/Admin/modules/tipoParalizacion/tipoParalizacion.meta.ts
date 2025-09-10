import { omitBaseEntity } from '../../constants/selectors.const'
import { TipoParalizacionService } from './tipoParalizacion.service'
import { TipoParalizacionModel } from '.'
import { TipoParalizacionProps } from './tipoParalizacion.props'
import { MetaModelDefinition } from '../../meta/metaModel'

const { propFactories, allFields } = TipoParalizacionProps

export const TipoParalizacionMeta: MetaModelDefinition<TipoParalizacionModel.Entity> =
  {
    config: {
      key: 'tipoParalizacion',
      service: TipoParalizacionService,
      title: {
        singular: 'Tipo de Paralización',
        plural: 'Tipos de Paralización',
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
