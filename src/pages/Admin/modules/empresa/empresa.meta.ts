import { NumberProp, RefProp, MetaModel, TextProp } from '../../services/config'
import { COMMON_PROPS } from '../../constants/commonProps.const'
import { Method } from '@/services/config'
import { omitBaseEntity } from '../../constants/selectors.const'
import { EmpresaModel, EmpresaService } from '.'
import { PaisMeta } from '../pais'
import { ProvinciaMeta } from '../provincia'
import { LocalidadMeta } from '../localidad'

export const EmpresaMeta = new MetaModel<EmpresaModel.Entity>({
  key: 'empresa',
  service: EmpresaService,
  refreshRate: 'low',
  title: {
    singular: 'Empresa',
    plural: 'Empresas',
  },
  faIcon: 'fa-solid fa-industry',

  anchorField: 'nombre',
  props: {
    cuit: new NumberProp('CUIT', {
      big: true,
      field: {
        required: true,
      },
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
  },
})

EmpresaMeta.fieldsByService = [
  {
    methods: [Method.GetAll, Method.GetOne],
    fields: EmpresaMeta.allFields,
  },
  {
    methods: [Method.Create, Method.UpdateOne],
    groups: [{ key: '', fields: omitBaseEntity(EmpresaMeta.allFields) }],
  },
]
