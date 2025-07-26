import { Method } from '@/services/config'
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
