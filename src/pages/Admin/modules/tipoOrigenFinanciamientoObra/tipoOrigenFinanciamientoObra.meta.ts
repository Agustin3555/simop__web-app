import { Method } from '@/services/config'
import { omitBaseEntity } from '../../constants/selectors.const'
import { TipoOrigenFinanciamientoObraService } from './tipoOrigenFinanciamientoObra.service'
import { TipoOrigenFinanciamientoObraProps } from './tipoOrigenFinanciamientoObra.props'
import { TipoOrigenFinanciamientoObraModel } from '.'
import { MetaModelDefinition } from '../../meta/metaModel'

const { propFactories, allFields } = TipoOrigenFinanciamientoObraProps

export const TipoOrigenFinanciamientoObraMeta: MetaModelDefinition<TipoOrigenFinanciamientoObraModel.Entity> =
  {
    config: {
      key: 'tipoOrigenFinanciamientoObra',
      service: TipoOrigenFinanciamientoObraService,
      title: {
        singular: 'Tipo de Origen de Financiamiento de Obra',
        plural: 'Tipos de Origen de Financiamiento de Obra',
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
