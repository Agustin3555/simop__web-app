import { LocalidadModel, PaisModel, ProvinciaModel } from '.'
import { NumberProp, RefProp, MetaModel, TextProp } from '../services/config'
import { EmpresaService } from '../services'
import { COMMON_PROPS } from '../constants/commonProps.const'
import { BaseEntity, BaseRef } from '@/models/config'
import { Method } from '@/services/config'
import { omitBaseEntity } from '../constants/selectors.const'

interface OwnFields {
  cuit: number
  nombre: string
  direccion: string
  numeroContacto: number
  email: string
}

interface RelationFields {
  pais: PaisModel.Ref
  provincia: ProvinciaModel.Ref
  localidad: LocalidadModel.Ref
}

export interface Entity extends BaseEntity, OwnFields, RelationFields {}

export type CreateEntity = OwnFields &
  Record<'paisId' | 'provinciaId' | 'localidadId', number>

export type UpdateEntity = Partial<CreateEntity>

export type Ref = BaseRef<OwnFields, 'cuit' | 'nombre'>

export const metaModel = new MetaModel<Entity>({
  key: 'empresa',
  service: EmpresaService,
  refreshRate: 'low',
  title: {
    singular: 'Empresa',
    plural: 'Empresas',
  },

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
      getMetaModel: () => PaisModel.metaModel,
    }),
    provincia: new RefProp({
      getMetaModel: () => ProvinciaModel.metaModel,
    }),
    localidad: new RefProp({
      getMetaModel: () => LocalidadModel.metaModel,
    }),
    ...COMMON_PROPS,
  },
})

metaModel.fieldsByService = [
  {
    methods: [Method.GetAll, Method.GetOne],
    fields: metaModel.allFields,
  },
  {
    methods: [Method.Create, Method.UpdateOne],
    groups: [{ key: '', fields: omitBaseEntity(metaModel.allFields) }],
  },
]
