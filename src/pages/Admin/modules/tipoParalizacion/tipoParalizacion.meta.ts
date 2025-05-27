import { MetaModel } from '../../services/config'
import { TIPO_PROPS } from '../../constants/commonProps.const'
import { Method } from '@/services/config'
import { omitBaseEntity } from '../../constants/selectors.const'
import { TipoParalizacionModel, TipoParalizacionService } from '.'

export const TipoParalizacionMeta = new MetaModel<TipoParalizacionModel.Entity>(
  {
    key: 'tipoParalizacion',
    service: TipoParalizacionService,
    title: {
      singular: 'Tipo de Paralización',
      plural: 'Tipos de Paralizaciones',
    },
    faIcon: 'fa-solid fa-shapes',

    anchorField: 'nombre',
    props: {
      ...TIPO_PROPS,
    },
  },
)

TipoParalizacionMeta.fieldsByService = [
  {
    methods: [Method.GetAll, Method.GetOne],
    fields: TipoParalizacionMeta.allFields,
  },
  {
    methods: [Method.Create, Method.UpdateOne],
    groups: [
      { key: '', fields: omitBaseEntity(TipoParalizacionMeta.allFields) },
    ],
  },
]
