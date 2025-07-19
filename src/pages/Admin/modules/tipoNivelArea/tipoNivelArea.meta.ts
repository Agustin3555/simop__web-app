import { MetaModel } from '../../meta'
import { TIPO_PROPS } from '../../constants/commonProps.const'
import { Method } from '@/services/config'
import { omitBaseEntity } from '../../constants/selectors.const'
import { TipoNivelAreaService } from './tipoNivelArea.service'
import { TipoNivelAreaModel } from '.'

export const TipoNivelAreaMeta = new MetaModel<TipoNivelAreaModel.Entity>({
  key: 'tipoNivelArea',
  service: TipoNivelAreaService,
  title: {
    singular: 'Tipo de Nivel de Área',
    plural: 'Tipos de Niveles de Área',
  },
  faIcon: 'fa-solid fa-shapes',

  anchorField: 'nombre',
  props: {
    ...TIPO_PROPS,
  },
})

TipoNivelAreaMeta.fieldsByService = [
  {
    methods: [Method.GetAll, Method.GetOne],
    fields: TipoNivelAreaMeta.allFields,
  },
  {
    methods: [Method.Create, Method.UpdateOne],
    groups: [{ fields: omitBaseEntity(TipoNivelAreaMeta.allFields) }],
  },
]
