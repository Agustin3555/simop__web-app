import { omitBaseEntity } from '../../constants/selectors.const'
import { TipoFinanciamientoObraService } from './tipoFinanciamientoObra.service'
import { TipoFinanciamientoObraModel } from '.'
import { TipoFinanciamientoObraProps } from './tipoFinanciamientoObra.props'
import { MetaModelDefinition } from '../../meta/metaModel'

const { propFactories, allFields } = TipoFinanciamientoObraProps

export const TipoFinanciamientoObraMeta: MetaModelDefinition<TipoFinanciamientoObraModel.Entity> =
  {
    config: {
      key: 'tipoFinanciamientoObra',
      service: TipoFinanciamientoObraService,
      title: {
        singular: 'Tipo de Financiamiento de Obra',
        plural: 'Tipos de Financiamientos de Obra',
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
