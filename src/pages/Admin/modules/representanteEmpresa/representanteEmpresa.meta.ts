import { omitBaseEntity } from '../../constants/selectors.const'
import { RepresentanteEmpresaService } from './representanteEmpresa.service'
import { RepresentanteEmpresaProps } from './representanteEmpresa.props'
import { RepresentanteEmpresaModel } from '.'
import { MetaModelDefinition } from '../../meta/metaModel'

const { propFactories, allFields } = RepresentanteEmpresaProps

export const RepresentanteEmpresaMeta: MetaModelDefinition<RepresentanteEmpresaModel.Entity> =
  {
    config: {
      key: 'representanteEmpresa',
      service: RepresentanteEmpresaService,
      refreshRate: 'low',
      title: {
        singular: 'Representante de Empresa',
        plural: 'Representantes de Empresa',
      },
      faIcon: 'fa-solid fa-user-tie',
      anchorField: 'id',
      allFields,
      propFactories,
    },

    mutationsFields: {
      add: [{ fields: omitBaseEntity(allFields) }],
      edit: [{ fields: omitBaseEntity(allFields) }],
    },
  }
