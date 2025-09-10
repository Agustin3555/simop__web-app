import { omitBaseEntity } from '../../constants/selectors.const'
import { InspectorService } from './inspector.service'
import { InspectorModel } from '.'
import { MetaModelDefinition } from '../../meta/metaModel'
import { InspectorProps } from './inspector.props'

const { propFactories, allFields } = InspectorProps

export const InspectorMeta: MetaModelDefinition<InspectorModel.Entity> = {
  config: {
    key: 'inspector',
    service: InspectorService,
    refreshRate: 'low',
    title: {
      singular: 'Inspector',
      plural: 'Inspectores',
    },
    faIcon: 'fa-solid fa-helmet-safety',
    anchorField: 'apellido',
    allFields,
    propFactories,
  },

  mutationsFields: {
    add: [{ fields: omitBaseEntity(allFields) }],
    edit: [{ fields: omitBaseEntity(allFields) }],
  },
}
