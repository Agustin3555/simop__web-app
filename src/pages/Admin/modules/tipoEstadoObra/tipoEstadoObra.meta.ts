import { Method } from '@/services/config'
import { omitBaseEntity } from '../../constants/selectors.const'
import { TipoEstadoObraService } from './tipoEstadoObra.service'
import { TipoEstadoObraProps } from './tipoEstadoObra.props'
import { TipoEstadoObraModel } from '.'
import { MetaModelDefinition } from '../../meta/metaModel'

const { propFactories, allFields } = TipoEstadoObraProps

export const TipoEstadoObraMeta: MetaModelDefinition<TipoEstadoObraModel.Entity> =
  {
    config: {
      key: 'tipoEstadoObra',
      service: TipoEstadoObraService,
      title: {
        singular: 'Estado',
        plural: 'Tipos de Estados de Obra',
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
