import { Method } from '@/services/config'
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
