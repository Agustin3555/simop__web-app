import { defineProps, buildMetaModel } from '../../meta'
import { TIPO_PROPS } from '../../constants/commonProps.const'
import { Method } from '@/services/config'
import { omitBaseEntity } from '../../constants/selectors.const'
import { TipoRepresentanteService } from './tipoRepresentante.service'
import { TipoRepresentanteModel } from '.'

const { props, allFields } =
  defineProps<TipoRepresentanteModel.Entity>(TIPO_PROPS)

export const TipoRepresentanteMeta = buildMetaModel(
  {
    key: 'tipoRepresentante',
    service: TipoRepresentanteService,
    title: {
      singular: 'Tipo de Representante',
      plural: 'Tipos de Representantes',
    },
    faIcon: 'fa-solid fa-user-tie',
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
