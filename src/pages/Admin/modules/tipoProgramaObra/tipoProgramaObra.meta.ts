import { MetaModel } from '../../services/config'
import { TIPO_PROPS } from '../../constants/commonProps.const'
import { Method } from '@/services/config'
import { omitBaseEntity } from '../../constants/selectors.const'
import { TipoProgramaObraService } from './tipoProgramaObra.service'
import { TipoProgramaObraModel } from '.'

export const TipoProgramaObraMeta = new MetaModel<TipoProgramaObraModel.Entity>(
  {
    key: 'tipoProgramaObra',
    service: TipoProgramaObraService,
    title: {
      singular: 'Obra Inaugurada',
      plural: 'Obra Inaugurada',
    },
    faIcon: 'fa-solid fa-shapes',

    anchorField: 'nombre',
    props: {
      ...TIPO_PROPS,
    },
  },
)

TipoProgramaObraMeta.fieldsByService = [
  {
    methods: [Method.GetAll, Method.GetOne],
    fields: TipoProgramaObraMeta.allFields,
  },
  {
    methods: [Method.Create, Method.UpdateOne],
    groups: [
      { key: '', fields: omitBaseEntity(TipoProgramaObraMeta.allFields) },
    ],
  },
]
