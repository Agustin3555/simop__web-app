import { MetaModel } from '../../services/config'
import { TIPO_PROPS } from '../../constants/commonProps.const'
import { Method } from '@/services/config'
import { omitBaseEntity } from '../../constants/selectors.const'
import { TipoModificacionModel, TipoModificacionService } from '.'

export const TipoModificacionMeta = new MetaModel<TipoModificacionModel.Entity>(
  {
    key: 'tipoModificacion',
    service: TipoModificacionService,
    title: {
      singular: 'Tipo de Modificación',
      plural: 'Tipos de Modificaciones',
    },
    faIcon: 'fa-solid fa-shapes',

    anchorField: 'nombre',
    props: {
      ...TIPO_PROPS,
    },
  },
)

TipoModificacionMeta.fieldsByService = [
  {
    methods: [Method.GetAll, Method.GetOne],
    fields: TipoModificacionMeta.allFields,
  },
  {
    methods: [Method.Create, Method.UpdateOne],
    groups: [
      { key: '', fields: omitBaseEntity(TipoModificacionMeta.allFields) },
    ],
  },
]
