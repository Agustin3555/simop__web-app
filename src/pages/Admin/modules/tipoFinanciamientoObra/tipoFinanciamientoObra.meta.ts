import { MetaModel } from '../../services/config'
import { TIPO_PROPS } from '../../constants/commonProps.const'
import { Method } from '@/services/config'
import { omitBaseEntity } from '../../constants/selectors.const'
import { TipoFinanciamientoObraModel, TipoFinanciamientoObraService } from '.'

export const TipoFinanciamientoObraMeta =
  new MetaModel<TipoFinanciamientoObraModel.Entity>({
    key: 'tipoFinanciamientoObra',
    service: TipoFinanciamientoObraService,
    title: {
      singular: 'Tipo de Financiamiento de Obra',
      plural: 'Tipos de Financiamientos de Obra',
    },
    faIcon: 'fa-solid fa-shapes',

    anchorField: 'nombre',
    props: {
      ...TIPO_PROPS,
    },
  })

TipoFinanciamientoObraMeta.fieldsByService = [
  {
    methods: [Method.GetAll, Method.GetOne],
    fields: TipoFinanciamientoObraMeta.allFields,
  },
  {
    methods: [Method.Create, Method.UpdateOne],
    groups: [
      { key: '', fields: omitBaseEntity(TipoFinanciamientoObraMeta.allFields) },
    ],
  },
]
