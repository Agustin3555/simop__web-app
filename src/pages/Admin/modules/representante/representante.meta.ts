import {
  defineProps,
  buildMetaModel,
  createTextProp,
  createRefProp,
  createNumberProp,
} from '../../meta'
import { COMMON_PROPS } from '../../constants/commonProps.const'
import { Method } from '@/services/config'
import { omitBaseEntity } from '../../constants/selectors.const'
import { RepresentanteService } from './representante.service'
import { RepresentanteModel } from '.'
import { LocalidadMeta } from '../localidad/localidad.meta'
import { PaisMeta } from '../pais/pais.meta'
import { ProvinciaMeta } from '../provincia/provincia.meta'

const { props, allFields } = defineProps<RepresentanteModel.Entity>({
  cuil: createNumberProp({
    title: 'CUIL',
    config: {
      isBig: true,
      field: {
        required: true,
      },
    },
  }),
  apellido: createTextProp({
    title: 'Apellido',
    config: {
      field: { required: true },
    },
  }),
  nombre: createTextProp({
    title: 'Nombre',
  }),
  direccion: createTextProp({
    title: 'Dirección',
  }),
  numeroMatricula: createTextProp({
    title: 'Número de Matricula',
  }),
  pais: createRefProp({
    getMetaModel: () => PaisMeta,
  }),
  provincia: createRefProp({
    getMetaModel: () => ProvinciaMeta,
  }),
  localidad: createRefProp({
    getMetaModel: () => LocalidadMeta,
  }),
  ...COMMON_PROPS,
})

export const RepresentanteMeta = buildMetaModel(
  {
    key: 'representante',
    service: RepresentanteService,
    refreshRate: 'low',
    title: {
      singular: 'Representante',
      plural: 'Representantes',
    },
    faIcon: 'fa-solid fa-user-tie',
    anchorField: 'apellido',
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
