import { Method } from '@/services/config'
import { omitBaseEntity } from '../../constants/selectors.const'
import { InspectorObraService } from './inspectorObra.service'
import { InspectorObraModel } from '.'
import { MetaModelDefinition } from '../../meta/metaModel'
import { InspectorObraProps } from './inspectorObra.props'

const { propFactories, allFields } = InspectorObraProps

export const InspectorObraMeta: MetaModelDefinition<InspectorObraModel.Entity> =
  {
    config: {
      key: 'inspectorObra',
      service: InspectorObraService,
      refreshRate: 'medium',
      title: {
        singular: 'Inspector de Obra',
        plural: 'Inspectores de Obra',
      },
      faIcon: 'fa-solid fa-helmet-safety',
      anchorField: 'id',
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
