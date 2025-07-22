import {
  NumberProp,
  RefProp,
  TextProp,
  defineProps,
  buildMetaModel,
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
  cuit: new NumberProp('CUIT', {
    big: true,
  }),
  nombre: new TextProp('Nombre', {
    field: {
      required: true,
    },
  }),
  direccion: new TextProp('Dirección declarada'),
  numeroContacto: new NumberProp('Número de contacto', {
    big: true,
  }),
  email: new TextProp('Email'),
  pais: new RefProp({
    getMetaModel: () => PaisMeta,
  }),
  provincia: new RefProp({
    getMetaModel: () => ProvinciaMeta,
  }),
  localidad: new RefProp({
    getMetaModel: () => LocalidadMeta,
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
