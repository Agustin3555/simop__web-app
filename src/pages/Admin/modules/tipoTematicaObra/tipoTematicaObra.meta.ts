import { Method } from '@/services/config'
import { omitBaseEntity } from '../../constants/selectors.const'
import { TipoTematicaObraService } from './tipoTematicaObra.service'
import { TipoTematicaObraProps } from './tipoTematicaObra.props'
import { TipoTematicaObraModel } from '.'
import { MetaModelDefinition } from '../../meta/metaModel'

const { propFactories, allFields } = TipoTematicaObraProps

export const TipoTematicaObraMeta: MetaModelDefinition<TipoTematicaObraModel.Entity> =
  {
    config: {
      key: 'tipoTematicaObra',
      service: TipoTematicaObraService,
      title: {
        singular: 'Temática de Obra',
        plural: 'Temáticas de Obra',
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
