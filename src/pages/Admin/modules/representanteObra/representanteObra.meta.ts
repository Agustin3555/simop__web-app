import { Method } from '@/services/config'
import { omitBaseEntity } from '../../constants/selectors.const'
import { RepresentanteObraService } from './representanteObra.service'
import { RepresentanteObraProps } from './representanteObra.props'
import { RepresentanteObraModel } from '.'
import { MetaModelDefinition } from '../../meta/metaModel'

const { propFactories, allFields } = RepresentanteObraProps

export const RepresentanteObraMeta: MetaModelDefinition<RepresentanteObraModel.Entity> =
  {
    config: {
      key: 'representanteObra',
      service: RepresentanteObraService,
      refreshRate: 'low',
      title: {
        singular: 'Representante de Obra',
        plural: 'Representantes de Obra',
      },
      faIcon: 'fa-solid fa-user-tie',
      anchorField: 'id',
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
