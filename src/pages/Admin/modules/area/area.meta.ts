import { Method } from '@/services/config'
import { omitBaseEntity } from '../../constants/selectors.const'
import { COMMON_PROPS } from '../../constants/commonProps.const'
import { MetaModel, RefProp, TextProp } from '../../meta'
import { AreaService } from './area.service'
import { AreaModel } from '.'
import { TipoNivelAreaMeta } from '../tipoNivelArea/tipoNivelArea.meta'

export const AreaMeta = new MetaModel<AreaModel.Entity>({
  key: 'area',
  service: AreaService,
  title: {
    singular: 'Área',
    plural: 'Áreas',
  },
  faIcon: 'fa-solid fa-network-wired',

  anchorField: 'nombre',
  props: {
    nombre: new TextProp('Nombre', {
      field: {
        required: true,
      },
    }),
    tipoNivelArea: new RefProp({
      getMetaModel: () => TipoNivelAreaMeta,
    }),
    area: new RefProp({
      getMetaModel: () => AreaMeta,
    }),
    ...COMMON_PROPS,
  },
})

AreaMeta.fieldsByService = [
  {
    methods: [Method.GetAll, Method.GetOne],
    fields: AreaMeta.allFields,
  },
  {
    methods: [Method.Create, Method.UpdateOne],
    groups: [{ fields: omitBaseEntity(AreaMeta.allFields) }],
  },
]
