import { MetaModel, TextProp } from '../../meta'
import { COMMON_PROPS } from '../../constants/commonProps.const'
import { omitBaseEntity } from '../../constants/selectors.const'
import { Method } from '@/services/config'
import { SubsecretariaService } from './subsecretaria.service'
import { SubsecretariaModel } from '.'

export const SubsecretariaMeta = new MetaModel<SubsecretariaModel.Entity>({
  key: 'subSecretaria',
  service: SubsecretariaService,
  title: {
    singular: 'Subsecretaría',
    plural: 'Subsecretarías',
  },
  faIcon: 'fa-solid fa-network-wired',
  // faIcon: 'fa-solid fa-sitemap',

  anchorField: 'nombre',
  props: {
    nombre: new TextProp('Nombre', {
      field: {
        required: true,
      },
    }),
    ...COMMON_PROPS,
  },
})

SubsecretariaMeta.fieldsByService = [
  {
    methods: [Method.GetAll, Method.GetOne],
    fields: SubsecretariaMeta.allFields,
  },
  {
    methods: [Method.Create, Method.UpdateOne],
    groups: [{ key: '', fields: omitBaseEntity(SubsecretariaMeta.allFields) }],
  },
]
