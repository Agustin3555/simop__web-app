import { PaisModel, ProvinciaModel, LocalidadModel } from '.'
import { NumberProp, RefProp, MetaModel, TextProp } from '../services/config'
import { RepresentanteService } from '../services'
import { COMMON_PROPS } from '../constants/commonProps.const'
import { BaseEntity, BaseRef } from '@/models/config'

export interface OwnFields {
  cuil: number
  apellido: string
  nombre: string
  direccion: string
  numeroMatricula: string
}

export interface RelationFields {
  pais: PaisModel.Ref
  provincia: ProvinciaModel.Ref
  localidad: LocalidadModel.Ref
}

export interface Entity extends BaseEntity, OwnFields, RelationFields {}

export type CreateEntity = OwnFields &
  Record<'paisId' | 'provinciaId' | 'localidadId', number>

export type UpdateEntity = Partial<CreateEntity>

export type Ref = BaseRef<OwnFields, 'cuil' | 'nombre' | 'apellido'>

export const scheme: MetaModel<Entity> = {
  key: 'representante',
  service: RepresentanteService,
  refreshRate: 'low',
  title: {
    singular: 'Representante',
    plural: 'Representantes',
  },
  anchorField: 'apellido',

  groups: [
    {
      props: {
        cuil: new NumberProp('CUIL', {
          big: true,
          field: {
            required: true,
          },
        }),
        apellido: new TextProp('Apellido', {
          field: {
            required: true,
          },
        }),
        nombre: new TextProp('Nombre'),
        direccion: new TextProp('Dirección'),
        numeroMatricula: new TextProp('Número de Matricula'),
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
