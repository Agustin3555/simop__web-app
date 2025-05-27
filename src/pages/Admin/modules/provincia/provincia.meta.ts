import { RefProp, MetaModel, TextProp } from '../../services/config'
import { COMMON_PROPS } from '../../constants/commonProps.const'
import { Method } from '@/services/config'
import { omitBaseEntity } from '../../constants/selectors.const'
import { ProvinciaModel, ProvinciaService } from '.'
import { PaisMeta } from '../pais'

export const ProvinciaMeta = new MetaModel<ProvinciaModel.Entity>({
  key: 'provincia',
  service: ProvinciaService,
  refreshRate: 'low',
  title: {
    singular: 'Provincia',
    plural: 'Provincias',
  },
  faIcon: 'fa-solid fa-vector-square',

  anchorField: 'nombre',
  props: {
    nombre: new TextProp('Nombre', {
      field: {
        required: true,
      },
    }),
    pais: new RefProp({
      getMetaModel: () => PaisMeta,
      field: {
        required: true,
      },
    }),
    ...COMMON_PROPS,
  },
})

ProvinciaMeta.fieldsByService = [
  {
    methods: [Method.GetAll, Method.GetOne],
    fields: ProvinciaMeta.allFields,
  },
  {
    methods: [Method.Create, Method.UpdateOne],
    groups: [{ key: '', fields: omitBaseEntity(ProvinciaMeta.allFields) }],
  },
]
