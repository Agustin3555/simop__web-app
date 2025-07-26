import { Method } from '@/services/config'
import { omitBaseEntity } from '../../constants/selectors.const'
import { TipoRedeterminacionService } from './tipoRedeterminacion.service'
import { TipoRedeterminacionProps } from './tipoRedeterminacion.props'
import { TipoRedeterminacionModel } from '.'
import { MetaModelDefinition } from '../../meta/metaModel'

const { propFactories, allFields } = TipoRedeterminacionProps

export const TipoRedeterminacionMeta: MetaModelDefinition<TipoRedeterminacionModel.Entity> =
  {
    config: {
      key: 'tipoRedeterminacion',
      service: TipoRedeterminacionService,
      title: {
        singular: 'Redeterminación',
        plural: 'Tipos de Redeterminación',
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
