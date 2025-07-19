import { MetaModel } from '../../meta'
import { TIPO_PROPS } from '../../constants/commonProps.const'
import { Method } from '@/services/config'
import { omitBaseEntity } from '../../constants/selectors.const'
import { TipoEnteObraService } from './tipoEnteObra.service'
import { TipoEnteObraModel } from '.'

export const TipoEnteObraMeta = new MetaModel<TipoEnteObraModel.Entity>({
  key: 'tipoEnteObra',
  service: TipoEnteObraService,
  title: {
    singular: 'Tipo de Ente de Obra',
    plural: 'Tipos de Entes de Obra',
  },
  faIcon: 'fa-solid fa-shapes',

  anchorField: 'nombre',
  props: {
    ...TIPO_PROPS,
  },
})

TipoEnteObraMeta.fieldsByService = [
  {
    methods: [Method.GetAll, Method.GetOne],
    fields: TipoEnteObraMeta.allFields,
  },
  {
    methods: [Method.Create, Method.UpdateOne],
    groups: [{ fields: omitBaseEntity(TipoEnteObraMeta.allFields) }],
  },
]
