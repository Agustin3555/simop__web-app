import { RefProp, MetaModel, TextProp } from '../../meta'
import { COMMON_PROPS } from '../../constants/commonProps.const'
import { Method } from '@/services/config'
import { omitBaseEntity } from '../../constants/selectors.const'
import { ProvinciaService } from './provincia.service'
import { ProvinciaModel } from '.'
import { PaisMeta } from '../pais/pais.meta'

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
    groups: [{ fields: omitBaseEntity(ProvinciaMeta.allFields) }],
  },
]
