import { Method } from '@/services/config'
import { omitBaseEntity } from '../../constants/selectors.const'
import { TipoEnteObraService } from './tipoEnteObra.service'
import { TipoEnteObraProps } from './tipoEnteObra.props'
import { TipoEnteObraModel } from '.'
import { MetaModelDefinition } from '../../meta/metaModel'

const { propFactories, allFields } = TipoEnteObraProps

export const TipoEnteObraMeta: MetaModelDefinition<TipoEnteObraModel.Entity> = {
  config: {
    key: 'tipoEnteObra',
    service: TipoEnteObraService,
    title: {
      singular: 'Tipo de Ente de Obra',
      plural: 'Tipos de Entes de Obra',
    },
    faIcon: 'fa-solid fa-shapes',
    anchorField: 'nombre',
    propFactories,
  },

  fieldsByService: [
    {
      methods: [Method.GetAll, Method.GetOne],
      fields: allFields,
    },
    {
      methods: [Method.Create, Method.UpdateOne],
      groups: [{ fields: omitBaseEntity(allFields) }],
    },
  ],
}
