import { MetaModel } from '../../meta'
import { TIPO_PROPS } from '../../constants/commonProps.const'
import { Method } from '@/services/config'
import { omitBaseEntity } from '../../constants/selectors.const'
import { TipoTematicaObraService } from './tipoTematicaObra.service'
import { TipoTematicaObraModel } from '.'

export const TipoTematicaObraMeta = new MetaModel<TipoTematicaObraModel.Entity>(
  {
    key: 'tipoTematicaObra',
    service: TipoTematicaObraService,
    title: {
      singular: 'Tipo de Temática de Obra',
      plural: 'Tipos de Temáticas de Obra',
    },
    faIcon: 'fa-solid fa-shapes',

    anchorField: 'nombre',
    props: {
      ...TIPO_PROPS,
    },
  },
)

TipoTematicaObraMeta.fieldsByService = [
  {
    methods: [Method.GetAll, Method.GetOne],
    fields: TipoTematicaObraMeta.allFields,
  },
  {
    methods: [Method.Create, Method.UpdateOne],
    groups: [
      { key: '', fields: omitBaseEntity(TipoTematicaObraMeta.allFields) },
    ],
  },
]
