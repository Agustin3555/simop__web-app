import { MetaModel } from '../../meta'
import { TIPO_PROPS } from '../../constants/commonProps.const'
import { Method } from '@/services/config'
import { omitBaseEntity } from '../../constants/selectors.const'
import { TipoOrigenFinanciamientoObraService } from './tipoOrigenFinanciamientoObra.service'
import { TipoOrigenFinanciamientoObraModel } from '.'

export const TipoOrigenFinanciamientoObraMeta =
  new MetaModel<TipoOrigenFinanciamientoObraModel.Entity>({
    key: 'tipoOrigenFinanciamientoObra',
    service: TipoOrigenFinanciamientoObraService,
    title: {
      singular: 'Tipo de Origen de Financiamiento de Obra',
      plural: 'Tipos de Orígenes de Financiamientos de Obra',
    },
    faIcon: 'fa-solid fa-shapes',

    anchorField: 'nombre',
    props: {
      ...TIPO_PROPS,
    },
  })

TipoOrigenFinanciamientoObraMeta.fieldsByService = [
  {
    methods: [Method.GetAll, Method.GetOne],
    fields: TipoOrigenFinanciamientoObraMeta.allFields,
  },
  {
    methods: [Method.Create, Method.UpdateOne],
    groups: [
      {
        key: '',
        fields: omitBaseEntity(TipoOrigenFinanciamientoObraMeta.allFields),
      },
    ],
  },
]
