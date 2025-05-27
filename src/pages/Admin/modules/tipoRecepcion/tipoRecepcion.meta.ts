import { MetaModel } from '../../services/config'
import { TIPO_PROPS } from '../../constants/commonProps.const'
import { Method } from '@/services/config'
import { omitBaseEntity } from '../../constants/selectors.const'
import { TipoRecepcionService } from './tipoRecepcion.service'
import { TipoRecepcionModel } from '.'

export const TipoRecepcionMeta = new MetaModel<TipoRecepcionModel.Entity>({
  key: 'tipoRecepcion',
  service: TipoRecepcionService,
  title: {
    singular: 'Tipo Recepción',
    plural: 'Tipos de Recepción',
  },
  faIcon: 'fa-solid fa-shapes',

  anchorField: 'nombre',
  props: {
    ...TIPO_PROPS,
  },
})

TipoRecepcionMeta.fieldsByService = [
  {
    methods: [Method.GetAll, Method.GetOne],
    fields: TipoRecepcionMeta.allFields,
  },
  {
    methods: [Method.Create, Method.UpdateOne],
    groups: [{ key: '', fields: omitBaseEntity(TipoRecepcionMeta.allFields) }],
  },
]
