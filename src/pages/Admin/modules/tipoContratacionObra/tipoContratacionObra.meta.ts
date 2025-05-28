import { MetaModel } from '../../meta'
import { TIPO_PROPS } from '../../constants/commonProps.const'
import { Method } from '@/services/config'
import { omitBaseEntity } from '../../constants/selectors.const'
import { TipoContratacionObraService } from './tipoContratacionObra.service'
import { TipoContratacionObraModel } from '.'

export const TipoContratacionObraMeta =
  new MetaModel<TipoContratacionObraModel.Entity>({
    key: 'tipoContratacionObra',
    service: TipoContratacionObraService,
    title: {
      singular: 'Tipo de Contratación de Obra',
      plural: 'Tipos de Contrataciones de Obra',
    },
    faIcon: 'fa-solid fa-shapes',

    anchorField: 'nombre',
    props: {
      ...TIPO_PROPS,
    },
  })

TipoContratacionObraMeta.fieldsByService = [
  {
    methods: [Method.GetAll, Method.GetOne],
    fields: TipoContratacionObraMeta.allFields,
  },
  {
    methods: [Method.Create, Method.UpdateOne],
    groups: [
      { key: '', fields: omitBaseEntity(TipoContratacionObraMeta.allFields) },
    ],
  },
]
