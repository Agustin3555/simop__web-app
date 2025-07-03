import { MetaModel, RefProp, TextProp } from '../../meta'
import { COMMON_PROPS } from '../../constants/commonProps.const'
import { Method } from '@/services/config'
import { omitBaseEntity } from '../../constants/selectors.const'
import { DepartamentoService } from './departamento.service'
import { DepartamentoModel } from '.'
import { ProvinciaMeta } from '../provincia/provincia.meta'
import { APGMeta } from '../apg/apg.meta'

export const DepartamentoMeta = new MetaModel<DepartamentoModel.Entity>({
  key: 'departamento',
  service: DepartamentoService,
  refreshRate: 'low',
  title: {
    singular: 'Departamento',
    plural: 'Departamentos',
  },
  faIcon: 'fa-solid fa-vector-square',

  anchorField: 'nombre',
  props: {
    nombre: new TextProp('Nombre', {
      field: {
        required: true,
      },
    }),
    provincia: new RefProp({
      getMetaModel: () => ProvinciaMeta,
    }),
    apg: new RefProp({
      getMetaModel: () => APGMeta,
    }),
    ...COMMON_PROPS,
  },
})

DepartamentoMeta.fieldsByService = [
  {
    methods: [Method.GetAll, Method.GetOne],
    fields: DepartamentoMeta.allFields,
  },
  {
    methods: [Method.Create, Method.UpdateOne],
    groups: [{ key: '', fields: omitBaseEntity(DepartamentoMeta.allFields) }],
  },
]
