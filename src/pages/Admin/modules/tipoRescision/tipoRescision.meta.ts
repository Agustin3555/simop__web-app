import { Method } from '@/services/config'
import { omitBaseEntity } from '../../constants/selectors.const'
import { TipoRescisionService } from './tipoRescision.service'
import { TipoRescisionModel } from '.'
import { TipoRescisionProps } from './tipoRescision.props'
import { MetaModelDefinition } from '../../meta/metaModel'

const { propFactories, allFields } = TipoRescisionProps

export const TipoRescisionMeta: MetaModelDefinition<TipoRescisionModel.Entity> =
  {
    config: {
      key: 'tipoRescision',
      service: TipoRescisionService,
      title: {
        singular: 'Rescisión',
        plural: 'Tipos de Rescisión',
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
