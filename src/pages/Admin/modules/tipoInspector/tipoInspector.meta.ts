import { MetaModel } from '../../meta'
import { TIPO_PROPS } from '../../constants/commonProps.const'
import { Method } from '@/services/config'
import { omitBaseEntity } from '../../constants/selectors.const'
import { TipoInspectorService } from './tipoInspector.service'
import { TipoInspectorModel } from '.'

export const TipoInspectorMeta = new MetaModel<TipoInspectorModel.Entity>({
  key: 'tipoInspector',
  service: TipoInspectorService,
  title: {
    singular: 'Tipo de Inspector',
    plural: 'Tipos de Inspectores',
  },
  faIcon: 'fa-solid fa-shapes',

  anchorField: 'nombre',
  props: {
    ...TIPO_PROPS,
  },
})

TipoInspectorMeta.fieldsByService = [
  {
    methods: [Method.GetAll, Method.GetOne],
    fields: TipoInspectorMeta.allFields,
  },
  {
    methods: [Method.Create, Method.UpdateOne],
    groups: [{ key: '', fields: omitBaseEntity(TipoInspectorMeta.allFields) }],
  },
]
