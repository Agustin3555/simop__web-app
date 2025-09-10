import { omitBaseEntity } from '../../constants/selectors.const'
import { TipoModificacionService } from './tipoModificacion.service'
import { TipoModificacionProps } from './tipoModificacion.props'
import { TipoModificacionModel } from '.'
import { MetaModelDefinition } from '../../meta/metaModel'

const { propFactories, allFields } = TipoModificacionProps

export const TipoModificacionMeta: MetaModelDefinition<TipoModificacionModel.Entity> =
  {
    config: {
      key: 'tipoModificacion',
      service: TipoModificacionService,
      title: {
        singular: 'Tipo de Modificación',
        plural: 'Tipos de Modificaciones',
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
