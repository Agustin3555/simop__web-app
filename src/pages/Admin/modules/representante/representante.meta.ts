import { omitBaseEntity } from '../../constants/selectors.const'
import { RepresentanteService } from './representante.service'
import { RepresentanteProps } from './representante.props'
import { RepresentanteModel } from '.'
import { MetaModelDefinition } from '../../meta/metaModel'

const { propFactories, allFields } = RepresentanteProps

export const RepresentanteMeta: MetaModelDefinition<RepresentanteModel.Entity> =
  {
    config: {
      key: 'representante',
      service: RepresentanteService,
      refreshRate: 'low',
      title: {
        singular: 'Representante',
        plural: 'Representantes',
      },
      faIcon: 'fa-solid fa-user-tie',
      anchorField: 'apellido',
      allFields,
      propFactories,
    },

    mutationsFields: {
      add: [{ fields: omitBaseEntity(allFields) }],
      edit: [{ fields: omitBaseEntity(allFields) }],
    },
  }
