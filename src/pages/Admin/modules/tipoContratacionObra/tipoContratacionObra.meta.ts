import { Method } from '@/services/config'
import { omitBaseEntity } from '../../constants/selectors.const'
import { TipoContratacionObraService } from './tipoContratacionObra.service'
import { TipoContratacionObraProps } from './tipoContratacionObra.props'
import { TipoContratacionObraModel } from '.'
import { MetaModelDefinition } from '../../meta/metaModel'

const { propFactories, allFields } = TipoContratacionObraProps

export const TipoContratacionObraMeta: MetaModelDefinition<TipoContratacionObraModel.Entity> =
  {
    config: {
      key: 'tipoContratacionObra',
      service: TipoContratacionObraService,
      title: {
        singular: 'Tipo de Contratación de Obra',
        plural: 'Tipos de Contrataciones de Obra',
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
