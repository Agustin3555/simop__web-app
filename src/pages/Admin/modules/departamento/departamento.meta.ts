import { RefProp, MetaModel, TextProp } from '../../meta'
import { COMMON_PROPS } from '../../constants/commonProps.const'
import { Method } from '@/services/config'
import { omitBaseEntity } from '../../constants/selectors.const'
import { DepartamentoService } from './departamento.service'
import { DepartamentoModel } from '.'
import { DireccionMeta } from '../direccion/direccion.meta'

export const DepartamentoMeta = new MetaModel<DepartamentoModel.Entity>({
  key: 'departamento',
  service: DepartamentoService,
  title: {
    singular: 'Departamento',
    plural: 'Departamentos',
  },
  faIcon: 'fa-solid fa-network-wired',

  anchorField: 'nombre',
  props: {
    nombre: new TextProp('Nombre', {
      field: {
        required: true,
      },
    }),
    direccion: new RefProp({
      getMetaModel: () => DireccionMeta,
      field: {
        required: true,
      },
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
