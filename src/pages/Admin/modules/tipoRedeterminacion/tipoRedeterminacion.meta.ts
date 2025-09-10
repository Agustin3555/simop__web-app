import { omitBaseEntity } from '../../constants/selectors.const'
import { TipoRedeterminacionService } from './tipoRedeterminacion.service'
import { TipoRedeterminacionProps } from './tipoRedeterminacion.props'
import { TipoRedeterminacionModel } from '.'
import { MetaModelDefinition } from '../../meta/metaModel'

const { propFactories, allFields } = TipoRedeterminacionProps

export const TipoRedeterminacionMeta: MetaModelDefinition<TipoRedeterminacionModel.Entity> =
  {
    config: {
      key: 'tipoRedeterminacion',
      service: TipoRedeterminacionService,
      title: {
        singular: 'Redeterminación',
        plural: 'Tipos de Redeterminación',
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
