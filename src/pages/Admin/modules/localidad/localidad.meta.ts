import { RefProp, MetaModel, TextProp } from '../../services/config'
import { COMMON_PROPS } from '../../constants/commonProps.const'
import { Method } from '@/services/config'
import { omitBaseEntity } from '../../constants/selectors.const'
import { ProvinciaMeta } from '../provincia'
import { LocalidadModel, LocalidadService } from '.'

export const LocalidadMeta = new MetaModel<LocalidadModel.Entity>({
  key: 'localidad',
  service: LocalidadService,
  refreshRate: 'low',
  title: {
    singular: 'Localidad',
    plural: 'Localidades',
  },
  faIcon: 'fa-solid fa-location-dot',

  anchorField: 'nombre',
  props: {
    nombre: new TextProp('Nombre', {
      field: {
        required: true,
      },
    }),
    provincia: new RefProp({
      getMetaModel: () => ProvinciaMeta,
      field: {
        required: true,
      },
    }),
    ...COMMON_PROPS,
  },
})

LocalidadMeta.fieldsByService = [
  {
    methods: [Method.GetAll, Method.GetOne],
    fields: LocalidadMeta.allFields,
  },
  {
    methods: [Method.Create, Method.UpdateOne],
    groups: [{ key: '', fields: omitBaseEntity(LocalidadMeta.allFields) }],
  },
]
