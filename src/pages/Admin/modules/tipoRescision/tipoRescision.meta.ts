import { omitBaseEntity } from '../../constants/selectors.const'
import { TipoRescisionService } from './tipoRescision.service'
import { TipoRescisionModel } from '.'
import { TipoRescisionProps } from './tipoRescision.props'
import { MetaModelDefinition } from '../../meta/metaModel'

const { propFactories, allFields } = TipoRescisionProps

export const TipoRescisionMeta: MetaModelDefinition<TipoRescisionModel.Entity> =
  {
    config: {
      key: 'tipoRescision',
      service: TipoRescisionService,
      title: {
        singular: 'Rescisión',
        plural: 'Tipos de Rescisión',
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
