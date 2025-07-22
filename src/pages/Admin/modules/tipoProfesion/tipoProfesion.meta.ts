import { defineProps, buildMetaModel } from '../../meta'
import { TIPO_PROPS } from '../../constants/commonProps.const'
import { Method } from '@/services/config'
import { omitBaseEntity } from '../../constants/selectors.const'
import { TipoProfesionService } from './tipoProfesion.service'
import { TipoProfesionModel } from '.'

const { props, allFields } = defineProps<TipoProfesionModel.Entity>(TIPO_PROPS)

export const TipoProfesionMeta = buildMetaModel(
  {
    key: 'tipoProfesion',
    service: TipoProfesionService,
    title: {
      singular: 'Profesión',
      plural: 'Profesiones',
    },
    faIcon: 'fa-solid fa-shapes',
    anchorField: 'nombre',
    props,
  },
  [
    {
      methods: [Method.GetAll, Method.GetOne],
      fields: allFields,
    },
    {
      methods: [Method.Create, Method.UpdateOne],
      groups: [{ fields: omitBaseEntity(allFields) }],
    },
  ],
)
