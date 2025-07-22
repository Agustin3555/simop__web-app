import { RefProp, TextProp, defineProps, buildMetaModel } from '../../meta'
import { COMMON_PROPS } from '../../constants/commonProps.const'
import { Method } from '@/services/config'
import { omitBaseEntity } from '../../constants/selectors.const'
import { ProvinciaService } from './provincia.service'
import { ProvinciaModel } from '.'
import { PaisMeta } from '../pais/pais.meta'

const { props, allFields } = defineProps<ProvinciaModel.Entity>({
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
})

export const ProvinciaMeta = buildMetaModel(
  {
    key: 'provincia',
    service: ProvinciaService,
    refreshRate: 'low',
    title: {
      singular: 'Provincia',
      plural: 'Provincias',
    },
    faIcon: 'fa-solid fa-vector-square',
    anchorField: 'nombre',
    props,
  },
  [
    {
      methods: [Method.GetAll, Method.GetOne],
      fields: allFields,
    },
    {
      methods: [Method.Create, Method.UpdateOne],
      groups: [{ fields: omitBaseEntity(allFields) }],
    },
  ],
)
