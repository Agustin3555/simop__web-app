import { Method } from '@/services/config'
import { omitBaseEntity } from '../../constants/selectors.const'
import { TipoInspectorService } from './tipoInspector.service'
import { TipoInspectorProps } from './tipoInspector.props'
import { TipoInspectorModel } from '.'
import { MetaModelDefinition } from '../../meta/metaModel'

const { propFactories, allFields } = TipoInspectorProps

export const TipoInspectorMeta: MetaModelDefinition<TipoInspectorModel.Entity> =
  {
    config: {
      key: 'tipoInspector',
      service: TipoInspectorService,
      title: {
        singular: 'Tipo de Inspector',
        plural: 'Tipos de Inspectores',
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
