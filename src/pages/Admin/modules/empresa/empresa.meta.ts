import { omitBaseEntity } from '../../constants/selectors.const'
import { EmpresaService } from './empresa.service'
import { EmpresaModel } from '.'
import { MetaModelDefinition } from '../../meta/metaModel'
import { EmpresaProps } from './empresa.props'

const { propFactories, allFields } = EmpresaProps

export const EmpresaMeta: MetaModelDefinition<EmpresaModel.Entity> = {
  config: {
    key: 'empresa',
    service: EmpresaService,
    refreshRate: 'low',
    title: {
      singular: 'Empresa',
      plural: 'Empresas',
    },
    faIcon: 'fa-solid fa-industry',
    anchorField: 'nombre',
    allFields,
    propFactories,
  },

  mutationsFields: {
    add: [{ fields: omitBaseEntity(allFields) }],
    edit: [{ fields: omitBaseEntity(allFields) }],
  },
}
