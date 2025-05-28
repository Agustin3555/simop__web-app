import { MetaModel } from '../../meta'
import { TIPO_PROPS } from '../../constants/commonProps.const'
import { Method } from '@/services/config'
import { omitBaseEntity } from '../../constants/selectors.const'
import { TipoRescisionService } from './tipoRescision.service'
import { TipoRescisionModel } from '.'

export const TipoRescisionMeta = new MetaModel<TipoRescisionModel.Entity>({
  key: 'tipoRescision',
  service: TipoRescisionService,
  title: {
    singular: 'Tipo Rescisión',
    plural: 'Tipos de Rescisión',
  },
  faIcon: 'fa-solid fa-shapes',

  anchorField: 'nombre',
  props: {
    ...TIPO_PROPS,
  },
})

TipoRescisionMeta.fieldsByService = [
  {
    methods: [Method.GetAll, Method.GetOne],
    fields: TipoRescisionMeta.allFields,
  },
  {
    methods: [Method.Create, Method.UpdateOne],
    groups: [{ key: '', fields: omitBaseEntity(TipoRescisionMeta.allFields) }],
  },
]
