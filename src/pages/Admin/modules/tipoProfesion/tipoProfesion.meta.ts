import { MetaModel } from '../../services/config'
import { TIPO_PROPS } from '../../constants/commonProps.const'
import { Method } from '@/services/config'
import { omitBaseEntity } from '../../constants/selectors.const'
import { TipoProfesionModel, TipoProfesionService } from '.'

export const TipoProfesionMeta = new MetaModel<TipoProfesionModel.Entity>({
  key: 'tipoProfesion',
  service: TipoProfesionService,
  title: {
    singular: 'Tipo de Profesión',
    plural: 'Tipos de Profesiones',
  },
  faIcon: 'fa-solid fa-shapes',

  anchorField: 'nombre',
  props: {
    ...TIPO_PROPS,
  },
})

TipoProfesionMeta.fieldsByService = [
  {
    methods: [Method.GetAll, Method.GetOne],
    fields: TipoProfesionMeta.allFields,
  },
  {
    methods: [Method.Create, Method.UpdateOne],
    groups: [{ key: '', fields: omitBaseEntity(TipoProfesionMeta.allFields) }],
  },
]
