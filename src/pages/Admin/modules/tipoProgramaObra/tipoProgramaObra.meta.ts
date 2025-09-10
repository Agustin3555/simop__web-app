import { omitBaseEntity } from '../../constants/selectors.const'
import { TipoProgramaObraService } from './tipoProgramaObra.service'
import { TipoProgramaObraModel } from '.'
import { TipoProgramaObraProps } from './tipoProgramaObra.props'
import { MetaModelDefinition } from '../../meta/metaModel'

const { propFactories, allFields } = TipoProgramaObraProps

export const TipoProgramaObraMeta: MetaModelDefinition<TipoProgramaObraModel.Entity> =
  {
    config: {
      key: 'tipoProgramaObra',
      service: TipoProgramaObraService,
      title: {
        singular: 'Programa de Obra',
        plural: 'Programas de Obra',
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
