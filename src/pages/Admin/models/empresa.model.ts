import { LocalidadModel, PaisModel, ProvinciaModel } from '.'
import { NumberProp, RefProp, MetaModel, TextProp } from '../services/config'
import { EmpresaService } from '../services'
import { COMMON_PROPS } from '../constants/commonProps.const'
import { BaseEntity, BaseRef } from '@/models/config'

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

export const scheme: MetaModel<Entity> = {
  key: 'empresa',
  service: EmpresaService,
  refreshRate: 'low',
  title: {
    singular: 'Empresa',
    plural: 'Empresas',
  },
  anchorField: 'nombre',

  groups: [
    {
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
          getScheme: () => PaisModel.scheme,
        }),
        provincia: new RefProp({
          getScheme: () => ProvinciaModel.scheme,
        }),
        localidad: new RefProp({
          getScheme: () => LocalidadModel.scheme,
        }),
        ...COMMON_PROPS,
      },
    },
  ],
}
