import { PaisModel, ProvinciaModel, LocalidadModel } from '.'
import { NumberProp, RefProp, MetaModel, TextProp } from '../services/config'
import { RepresentanteService } from '../services'
import { COMMON_PROPS } from '../constants/commonProps.const'
import { BaseEntity, BaseRef } from '@/models/config'
import { Method } from '@/services/config'
import { omitBaseEntity } from '../constants/selectors.const'

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

export const metaModel = new MetaModel<Entity>({
  key: 'representante',
  service: RepresentanteService,
  refreshRate: 'low',
  title: {
    singular: 'Representante',
    plural: 'Representantes',
  },
  faIcon: 'fa-solid fa-user-tie',

  anchorField: 'apellido',
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
