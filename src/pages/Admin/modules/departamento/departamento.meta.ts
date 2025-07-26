import { Method } from '@/services/config'
import { omitBaseEntity } from '../../constants/selectors.const'
import { DepartamentoService } from './departamento.service'
import { MetaModelDefinition } from '../../meta/metaModel'
import { DepartamentoModel } from '.'
import { DepartamentoProps } from './departamento.props'

const { propFactories, allFields } = DepartamentoProps

export const DepartamentoMeta: MetaModelDefinition<DepartamentoModel.Entity> = {
  config: {
    key: 'departamento',
    service: DepartamentoService,
    refreshRate: 'low',
    title: {
      singular: 'Departamento',
      plural: 'Departamentos',
    },
    faIcon: 'fa-solid fa-vector-square',
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
