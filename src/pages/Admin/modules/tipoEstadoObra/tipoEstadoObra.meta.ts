import { MetaModel } from '../../meta'
import { TIPO_PROPS } from '../../constants/commonProps.const'
import { Method } from '@/services/config'
import { omitBaseEntity } from '../../constants/selectors.const'
import { TipoEstadoObraService } from './tipoEstadoObra.service'
import { TipoEstadoObraModel } from '.'

export const TipoEstadoObraMeta = new MetaModel<TipoEstadoObraModel.Entity>({
  key: 'tipoEstadoObra',
  service: TipoEstadoObraService,
  title: {
    singular: 'Estado',
    plural: 'Tipos de Estados de Obra',
  },
  faIcon: 'fa-solid fa-shapes',

  anchorField: 'nombre',
  props: {
    ...TIPO_PROPS,
  },
})

TipoEstadoObraMeta.fieldsByService = [
  {
    methods: [Method.GetAll, Method.GetOne],
    fields: TipoEstadoObraMeta.allFields,
  },
  {
    methods: [Method.Create, Method.UpdateOne],
    groups: [{ key: '', fields: omitBaseEntity(TipoEstadoObraMeta.allFields) }],
  },
]
