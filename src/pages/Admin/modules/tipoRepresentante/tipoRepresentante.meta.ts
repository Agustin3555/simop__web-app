import { omitBaseEntity } from '../../constants/selectors.const'
import { TipoRepresentanteService } from './tipoRepresentante.service'
import { TipoRepresentanteProps } from './tipoRepresentante.props'
import { TipoRepresentanteModel } from '.'
import { MetaModelDefinition } from '../../meta/metaModel'

const { propFactories, allFields } = TipoRepresentanteProps

export const TipoRepresentanteMeta: MetaModelDefinition<TipoRepresentanteModel.Entity> =
  {
    config: {
      key: 'tipoRepresentante',
      service: TipoRepresentanteService,
      title: {
        singular: 'Tipo de Representante',
        plural: 'Tipos de Representantes',
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
