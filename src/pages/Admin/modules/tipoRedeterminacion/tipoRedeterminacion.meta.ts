import { MetaModel } from '../../services/config'
import { TIPO_PROPS } from '../../constants/commonProps.const'
import { Method } from '@/services/config'
import { omitBaseEntity } from '../../constants/selectors.const'
import { TipoRedeterminacionModel, TipoRedeterminacionService } from '.'

export const TipoRedeterminacionMeta =
  new MetaModel<TipoRedeterminacionModel.Entity>({
    key: 'tipoRedeterminacion',
    service: TipoRedeterminacionService,
    title: {
      singular: 'Tipo Redeterminación',
      plural: 'Tipos de Redeterminación',
    },
    faIcon: 'fa-solid fa-shapes',

    anchorField: 'nombre',
    props: {
      ...TIPO_PROPS,
    },
  })

TipoRedeterminacionMeta.fieldsByService = [
  {
    methods: [Method.GetAll, Method.GetOne],
    fields: TipoRedeterminacionMeta.allFields,
  },
  {
    methods: [Method.Create, Method.UpdateOne],
    groups: [
      { key: '', fields: omitBaseEntity(TipoRedeterminacionMeta.allFields) },
    ],
  },
]
