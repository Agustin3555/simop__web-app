import { MetaModel } from '../../services/config'
import { TIPO_PROPS } from '../../constants/commonProps.const'
import { Method } from '@/services/config'
import { omitBaseEntity } from '../../constants/selectors.const'
import { TipoRepresentanteService } from './tipoRepresentante.service'
import { TipoRepresentanteModel } from '.'

export const TipoRepresentanteMeta =
  new MetaModel<TipoRepresentanteModel.Entity>({
    key: 'tipoRepresentante',
    service: TipoRepresentanteService,
    title: {
      singular: 'Tipo de Representante',
      plural: 'Tipos de Representantes',
    },
    faIcon: 'fa-solid fa-shapes',

    anchorField: 'nombre',
    props: {
      ...TIPO_PROPS,
    },
  })

TipoRepresentanteMeta.fieldsByService = [
  {
    methods: [Method.GetAll, Method.GetOne],
    fields: TipoRepresentanteMeta.allFields,
  },
  {
    methods: [Method.Create, Method.UpdateOne],
    groups: [
      { key: '', fields: omitBaseEntity(TipoRepresentanteMeta.allFields) },
    ],
  },
]
