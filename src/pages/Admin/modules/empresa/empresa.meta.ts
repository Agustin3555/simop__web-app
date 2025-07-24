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
import { EmpresaService } from './empresa.service'
import { EmpresaModel } from '.'
import { LocalidadMeta } from '../localidad/localidad.meta'
import { PaisMeta } from '../pais/pais.meta'
import { ProvinciaMeta } from '../provincia/provincia.meta'

const { props, allFields } = defineProps<EmpresaModel.Entity>({
  cuit: createNumberProp({
    title: 'CUIT',
    config: {
      isBig: true,
    },
  }),
  nombre: createTextProp({
    title: 'Nombre',
    config: {
      field: {
        required: true,
      },
    },
  }),
  direccion: createTextProp({
    title: 'Dirección declarada',
  }),
  numeroContacto: createNumberProp({
    title: 'Número de contacto',
    config: {
      isBig: true,
    },
  }),
  email: createTextProp({
    title: 'Email',
  }),
  pais: createRefProp({
    metaModelKey: () => PaisMeta,
  }),
  provincia: createRefProp({
    metaModelKey: () => ProvinciaMeta,
  }),
  localidad: createRefProp({
    metaModelKey: () => LocalidadMeta,
  }),
  ...COMMON_PROPS,
})

export const EmpresaMeta = buildMetaModel(
  {
    key: 'empresa',
    service: EmpresaService,
    refreshRate: 'low',
    title: {
      singular: 'Empresa',
      plural: 'Empresas',
    },
    faIcon: 'fa-solid fa-industry',
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
