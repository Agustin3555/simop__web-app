import {
  defineProps,
  buildMetaModel,
  createTextProp,
  createRefProp,
} from '../../meta'
import { Method } from '@/services/config'
import { omitBaseEntity } from '../../constants/selectors.const'
import { COMMON_PROPS } from '../../constants/commonProps.const'
import { AreaService } from './area.service'
import { AreaModel } from '.'
import { TipoNivelAreaMeta } from '../tipoNivelArea/tipoNivelArea.meta'

const { props, allFields } = defineProps<AreaModel.Entity>({
  nombre: createTextProp({
    title: 'Nombre',
    config: {
      field: {
        required: true,
      },
    },
  }),
  tipoNivelArea: createRefProp({
    getMetaModel: () => TipoNivelAreaMeta,
  }),
  area: createRefProp({
    getMetaModel: () => AreaMeta,
  }),
  ...COMMON_PROPS,
})

export const AreaMeta = buildMetaModel(
  {
    key: 'area',
    service: AreaService,
    title: {
      singular: 'Área',
      plural: 'Áreas',
    },
    faIcon: 'fa-solid fa-network-wired',
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
